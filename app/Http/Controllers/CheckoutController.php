<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Services\MidtransService;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    protected MidtransService $midtransService;

    public function __construct(MidtransService $midtransService)
    {
        $this->midtransService = $midtransService;
    }

    public function index(): Response
    {
        $items = Cart::with('product')
            ->where('user_id', Auth::id())
            ->get();

        $subtotal = $items->sum(fn($i) => $i->product->price * $i->quantity);
        return Inertia::render('checkout/index', [
            'cartItems' => $items,
            'subtotal' => $subtotal,
            'address' => Auth::user()->address,
            'phone' => Auth::user()->phone,
        ]);
    }

    public function processCheckout(Request $request)
    {
        try {
            $user = Auth::user();

            if (!$user->address || !$user->phone) {
                return redirect()->back()->with('error', 'Please complete your profile address and phone first.');
            }

            $cartItems = Cart::with('product')
                ->where('user_id', $user->id)
                ->get();

            if ($cartItems->isEmpty()) {
                return redirect()->route('cart.index')
                    ->with('warning', 'Your cart is empty. Please add items before checkout.');
            }

            // Check stock availability
            foreach ($cartItems as $item) {
                if ($item->product->stock < $item->quantity) {
                    return redirect()->route('cart.index')
                        ->with('error', "Insufficient stock for {$item->product->name}. Only {$item->product->stock} items available.");
                }
            }

            // Prepare cart data for payment
            $cartData = $cartItems->map(function ($item) {
                return [
                    'product_id' => $item->product_id,
                    'name' => $item->product->name,
                    'category' => $item->product->category,
                    'price' => $item->product->price,
                    'quantity' => $item->quantity,
                ];
            })->toArray();

            $userData = [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'address' => $user->address,
            ];

            // Create payment token BEFORE order creation
            $paymentData = $this->midtransService->createSnapTokenFromCart($cartData, $userData);

            return Inertia::render('checkout/payment', [
                'cartItems' => $cartItems->load('product'),
                'snapToken' => $paymentData['snap_token'],
                'tempOrderId' => $paymentData['temp_order_id'],
                'totalAmount' => $paymentData['total_amount'],
                'clientKey' => config('midtrans.client_key'),
                'isProduction' => config('midtrans.is_production'),
            ]);
        } catch (\Exception $e) {
            Log::error('Checkout error: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to process checkout. Please try again.');
        }
    }
}
