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

            // Validate shipping/contact data from form
            $validated = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'email' => ['nullable', 'email'],
                'phone' => ['required', 'string', 'max:30'],
                'area' => ['required', 'string', 'in:Utara,Timur,Barat,Selatan'],
                'postal_code' => ['nullable', 'string', 'max:10'],
                'address_line' => ['required', 'string', 'max:500'],
            ]);

            $cartItems = Cart::with('product')
                ->where('user_id', $user->id)
                ->get();

            if ($cartItems->isEmpty()) {
                return redirect()->route('cart.index')
                    ->with('warning', 'Keranjang Anda kosong. Tambahkan item sebelum checkout.');
            }

            // Check stock availability
            foreach ($cartItems as $item) {
                if ($item->product->stock < $item->quantity) {
                    return redirect()->route('cart.index')
                        ->with('error', "Stok untuk {$item->product->name} tidak mencukupi. Hanya tersedia {$item->product->stock} item.");
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

            // Normalisasi address_line: hilangkan prefix "Denpasar Area, " dan kode pos di akhir jika terduplikasi
            $addressLine = $validated['address_line'];
            $addressLine = preg_replace('/^\s*Denpasar\s+(Utara|Timur|Barat|Selatan)\s*,\s*/i', '', $addressLine);
            if (!empty($validated['postal_code'])) {
                $pc = preg_quote($validated['postal_code'], '/');
                $addressLine = preg_replace("/\s*{$pc}\s*$/", '', $addressLine);
            } else {
                // Jika tidak ada postal_code di form, buang pola 5 digit di akhir agar tidak dobel nanti
                $addressLine = preg_replace('/\s*\d{5}\s*$/', '', $addressLine);
            }
            $addressLine = trim($addressLine);

            // Simpan alamat user TANPA kode pos (karena ada field terpisah)
            $profileAddress = 'Denpasar ' . $validated['area'] . ', ' . $addressLine;
            // Alamat pengiriman (untuk payment/nota) dapat menyertakan kode pos jika ada
            $shippingAddress = $profileAddress . (!empty($validated['postal_code']) ? ' ' . $validated['postal_code'] : '');

            // Persist shipping info to profile for future checkouts
            $user->name = $validated['name'] ?? $user->name;
            $user->email = $validated['email'] ?? $user->email;
            $user->phone = $validated['phone'];
            $user->address = $profileAddress;
            if (!empty($validated['postal_code'])) {
                $user->postal_code = $validated['postal_code'];
            }
            $user->save();

            $userData = [
                'id' => $user->id,
                'name' => $validated['name'] ?? $user->name,
                'email' => $validated['email'] ?? $user->email,
                'phone' => $validated['phone'],
                'address' => $shippingAddress,
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
                    'shipping_address' => $shippingAddress,
                ]
            ]);

            // Redirect directly to Midtrans payment page
            return Inertia::location($paymentData['redirect_url']);
        } catch (\Exception $e) {
            Log::error('Checkout error: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Gagal memproses checkout. Silakan coba lagi.');
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
            // Note: ignore any synthetic "status" query to avoid false positives from gateways

            // Fallback: Check transaction status from Midtrans
            if ($transactionStatus) {
                if (in_array($transactionStatus, ['settlement', 'capture'])) {
                    $this->handleSuccessfulPayment();
                    return redirect()->route('payment.success')
                        ->with('success', 'Pembayaran berhasil! Pesanan Anda sedang diproses.');
                } elseif ($transactionStatus === 'pending') {
                    return redirect()->route('payment.pending')
                        ->with('info', 'Pembayaran tertunda. Silakan selesaikan pembayaran Anda.');
                } else {
                    return redirect()->route('cart.index')
                        ->with('error', 'Pembayaran gagal atau dibatalkan. Silakan coba lagi.');
                }
            }

            // If no reliable status in query, check with Midtrans API
            if ($orderId) {
                $this->setupMidtransConfig();
                $midtransService = new MidtransService();
                $transactionDetails = $midtransService->checkTransactionStatus($orderId);

                $ts = $transactionDetails['transaction_status'] ?? null;
                $fraud = $transactionDetails['fraud_status'] ?? null;

                if ($ts === 'capture') {
                    if ($fraud === 'accept') {
                        $this->handleSuccessfulPayment();
                        return redirect()->route('payment.success')
                            ->with('success', 'Pembayaran berhasil! Pesanan Anda sedang diproses.');
                    }
                    // capture but not accept => treat as pending/failed and keep cart
                    return redirect()->route('payment.pending')
                        ->with('info', 'Pembayaran sedang ditinjau. Mohon tunggu konfirmasi.');
                }

                if (in_array($ts, ['settlement', 'success'])) {
                    $this->handleSuccessfulPayment();
                    return redirect()->route('payment.success')
                        ->with('success', 'Pembayaran berhasil! Pesanan Anda sedang diproses.');
                }

                if (in_array($ts, ['pending'])) {
                    return redirect()->route('payment.pending')
                        ->with('info', 'Pembayaran tertunda. Silakan selesaikan pembayaran Anda.');
                }

                if (in_array($ts, ['deny', 'cancel', 'expire', 'failure'])) {
                    return redirect()->route('cart.index')
                        ->with('error', 'Pembayaran gagal atau dibatalkan. Silakan coba lagi.');
                }

                // Unknown status: do not clear cart
                return redirect()->route('cart.index')
                    ->with('info', 'Status pembayaran tidak diketahui. Silakan periksa riwayat transaksi Anda.');
            }

            // Default fallback
            return redirect()->route('cart.index')
                ->with('info', 'Status pembayaran tidak diketahui. Silakan periksa riwayat transaksi Anda.');
        } catch (\Exception $e) {
            Log::error('Payment redirect error: ' . $e->getMessage());
            return redirect()->route('cart.index')
                ->with('error', 'Terjadi kesalahan saat memproses pengalihan pembayaran Anda.');
        }
    }

    /**
     * Handle successful payment - create order and clear cart as fallback
     */
    private function handleSuccessfulPayment()
    {
        try {
            $pendingPayment = session('pending_payment');
            
            if (!$pendingPayment || !Auth::check()) {
                return;
            }

            $user = Auth::user();
            
            // Check if order already exists to prevent duplicates
            $existingOrder = Order::where('user_id', $user->id)
                ->where('total_price', $pendingPayment['total_amount'])
                ->where('created_at', '>=', now()->subHours(1))
                ->first();
                
            if ($existingOrder) {
                // Order already exists, just clear cart and session
                Cart::where('user_id', $user->id)->delete();
                session()->forget('pending_payment');
                return;
            }

            DB::transaction(function () use ($pendingPayment, $user) {
                // Create the order
                $order = Order::create([
                    'user_id' => $user->id,
                    'total_price' => $pendingPayment['total_amount'],
                    'address' => $user->address,
                    'phone' => $user->phone,
                    'status' => 'pending', // pending = not shipped yet (payment is confirmed)
                ]);
                
                // Create order items and update stock
                foreach ($pendingPayment['cart_items'] as $cartItem) {
                    $product = \App\Models\Product::find($cartItem['product_id']);
                    if ($product && $product->stock >= $cartItem['quantity']) {
                        OrderItem::create([
                            'order_id' => $order->id,
                            'product_id' => $cartItem['product_id'],
                            'quantity' => $cartItem['quantity'],
                            'price' => $cartItem['price'],
                        ]);
                        
                        // Decrease stock
                        $product->decrement('stock', $cartItem['quantity']);
                    }
                }
                
                // Clear the user's cart
                Cart::where('user_id', $user->id)->delete();
                
                // Clear session data
                session()->forget('pending_payment');
                
                Log::info('Order created successfully via payment redirect fallback', ['order_id' => $order->id, 'user_id' => $user->id]);
            });
        } catch (\Exception $e) {
            Log::error('Failed to handle successful payment: ' . $e->getMessage());
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
