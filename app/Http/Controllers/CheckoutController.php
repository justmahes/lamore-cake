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
        $subtotal = $items->sum(fn($i) => $i->product->price * $i->quantity);
        return Inertia::render('checkout/index', [
            'cartItems' => $items,
            'subtotal' => $subtotal,
        ]);
    }

    public function processCheckout(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'address' => 'required',
            'phone' => 'required',
        ]);

        DB::transaction(function () use ($data) {
            $items = Cart::with('product')
                ->where('user_id', Auth::id())
                ->get();

            $order = Order::create([
                'user_id' => Auth::id(),
                'total_price' => $items->sum(fn($i) => $i->product->price * $i->quantity),
                'address' => $data['address'],
                'phone' => $data['phone'],
            ]);

            foreach ($items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->product->price,
                ]);
            }

            Cart::where('user_id', Auth::id())->delete();
        });

        return redirect()->route('payment.upload.form', ['order' => Order::latest()->first()->id]);
    }
}
