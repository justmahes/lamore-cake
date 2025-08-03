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
use Midtrans\Config;

class CheckoutController extends Controller
{
    private function setupMidtransConfig()
    {
        $serverKey = env('MIDTRANS_SERVER_KEY');
        $clientKey = env('MIDTRANS_CLIENT_KEY');
        $isProduction = env('MIDTRANS_IS_PRODUCTION', false);

        Config::$serverKey = $serverKey;
        Config::$clientKey = $clientKey;
        Config::$isProduction = (bool) $isProduction;
        Config::$isSanitized = true;
        Config::$is3ds = true;
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
            $this->setupMidtransConfig();
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

            // Create payment redirect URL
            $midtransService = new MidtransService();
            $paymentData = $midtransService->createRedirectPaymentFromCart($cartData, $userData);
            // Log::info('Payment redirect URL: ' . $paymentData['redirect_url']);

            session([
                'pending_payment' => [
                    'order_id' => $paymentData['order_id'],
                    'user_id' => $user->id,
                    'cart_items' => $cartData,
                    'total_amount' => $paymentData['total_amount'],
                    'user_data' => $userData,
                ]
            ]);

            // Redirect directly to Midtrans payment page
            return Inertia::location($paymentData['redirect_url']);
        } catch (\Exception $e) {
            Log::error('Checkout error: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to process checkout. Please try again.');
        }
    }

    /**
     * Handle payment notification from Midtrans
     */
    public function paymentNotification(Request $request)
    {
        try {
            $this->setupMidtransConfig();

            $notification = $request->all();
            Log::info('Midtrans notification received', $notification);

            $midtransService = new MidtransService();
            $result = $midtransService->handleNotification($notification);

            if ($result) {
                return response('OK', 200);
            } else {
                return response('Failed', 400);
            }
        } catch (\Exception $e) {
            Log::error('Payment notification error: ' . $e->getMessage());
            return response('Error', 500);
        }
    }

    /**
     * Handle payment redirect from Midtrans
     */
    public function paymentRedirect(Request $request)
    {
        try {
            // Midtrans sends different parameters based on the callback type
            $orderId = $request->query('order_id');
            $statusCode = $request->query('status_code');
            $transactionStatus = $request->query('transaction_status');
            $status = $request->query('status'); // Our custom status parameter

            if ($status) {
                switch ($status) {
                    case 'success':
                        return redirect()->route('payment.success')
                            ->with('success', 'Payment completed successfully! Your order is being processed.');
                    case 'pending':
                        return redirect()->route('payment.pending')
                            ->with('info', 'Payment is pending. Please complete your payment.');
                    case 'failed':
                        return redirect()->route('cart.index')
                            ->with('error', 'Payment failed or was cancelled. Please try again.');
                }
            }

            // Fallback: Check transaction status from Midtrans
            if ($transactionStatus) {
                if (in_array($transactionStatus, ['settlement', 'capture'])) {
                    return redirect()->route('payment.success')
                        ->with('success', 'Payment completed successfully! Your order is being processed.');
                } elseif ($transactionStatus === 'pending') {
                    return redirect()->route('payment.pending')
                        ->with('info', 'Payment is pending. Please complete your payment.');
                } else {
                    return redirect()->route('cart.index')
                        ->with('error', 'Payment failed or was cancelled. Please try again.');
                }
            }

            // If no status information, check with Midtrans API
            if ($orderId) {
                $this->setupMidtransConfig();
                $midtransService = new MidtransService();
                $transactionDetails = $midtransService->checkTransactionStatus($orderId);

                if (in_array($transactionDetails['transaction_status'], ['settlement', 'capture'])) {
                    return redirect()->route('payment.success')
                        ->with('success', 'Payment completed successfully! Your order is being processed.');
                } else {
                    return redirect()->route('payment.pending')
                        ->with('info', 'Payment is being processed. Please wait for confirmation.');
                }
            }

            // Default fallback
            return redirect()->route('cart.index')
                ->with('info', 'Payment status unknown. Please check your transaction history.');
        } catch (\Exception $e) {
            Log::error('Payment redirect error: ' . $e->getMessage());
            return redirect()->route('cart.index')
                ->with('error', 'An error occurred while processing your payment redirect.');
        }
    }

    /**
     * Payment success page
     */
    public function paymentSuccess()
    {
        return Inertia::render('checkout/success');
    }

    /**
     * Payment pending page
     */
    public function paymentPending()
    {
        return Inertia::render('checkout/pending');
    }
}
