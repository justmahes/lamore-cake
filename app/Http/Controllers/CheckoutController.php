<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    public function index(): Response
    {
        $items = Cart::with('product')
            ->where('user_id', Auth::id())
            ->get();
        $subtotal = $items->sum(fn ($i) => $i->product->price * $i->quantity);
        return Inertia::render('checkout/index', [
            'cartItems' => $items,
            'subtotal' => $subtotal,
            'address' => Auth::user()->address,
            'phone' => Auth::user()->phone,
        ]);
    }

    public function processCheckout(Request $request): RedirectResponse
    {
        $user = Auth::user();
        if (!$user->address || !$user->phone) {
            return redirect()->back()->withErrors(['address' => 'Please complete your profile address and phone first.']);
        }

        $order = DB::transaction(function () use ($user) {
            $items = Cart::with('product')
                ->where('user_id', $user->id)
                ->get();

            $order = Order::create([
                'user_id' => $user->id,
                'total_price' => $items->sum(fn ($i) => $i->product->price * $i->quantity),
                'address' => $user->address,
                'phone' => $user->phone,
            ]);

            foreach ($items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->product->price,
                ]);
            }

            Cart::where('user_id', $user->id)->delete();

            return $order;
        });

        return redirect()->route('payment.upload.form', ['order' => $order->id]);
    }
}
