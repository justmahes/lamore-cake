<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Payment;
use Midtrans\Config;
use Midtrans\Snap;
use Midtrans\Transaction;
use Exception;

class MidtransService
{
    public function __construct()
    {
        // Configuration is now handled externally in the controller
        // This ensures proper validation and explicit setup
    }

    /**
     * Create redirect payment URL for cart items before order creation
     */
    public function createRedirectPaymentFromCart(array $cartItems, $user): array
    {
        try {
            $totalAmount = collect($cartItems)->sum(fn($item) => $item['price'] * $item['quantity']);
            $orderId = 'ORDER-' . $user['id'] . '-' . time();
            
            $params = [
                'transaction_details' => [
                    'order_id' => $orderId,
                    'gross_amount' => (int) $totalAmount,
                ],
                'customer_details' => [
                    'first_name' => $user['name'],
                    'email' => $user['email'],
                    'phone' => $user['phone'],
                    'billing_address' => [
                        'first_name' => $user['name'],
                        'address' => $user['address'],
                        'phone' => $user['phone'],
                    ],
                    'shipping_address' => [
                        'first_name' => $user['name'],
                        'address' => $user['address'],
                        'phone' => $user['phone'],
                    ],
                ],
                'item_details' => $this->getCartItemDetails($cartItems),
                'callbacks' => [
                    'finish' => route('payment.redirect') . '?status=success',
                    'unfinish' => route('payment.redirect') . '?status=pending', 
                    'error' => route('payment.redirect') . '?status=failed',
                ],
                'custom_field1' => json_encode($cartItems), // Store cart data for later order creation
                'custom_field2' => $user['id'], // Store user ID
            ];

            // Get the snap redirect URL instead of token
            $snapToken = Snap::getSnapToken($params);
            $snapUrl = Snap::createTransaction($params)->redirect_url;

            return [
                'redirect_url' => $snapUrl,
                'snap_token' => $snapToken,
                'order_id' => $orderId,
                'total_amount' => $totalAmount,
            ];
        } catch (Exception $e) {
            throw new Exception('Failed to create payment: ' . $e->getMessage());
        }
    }

    /**
     * Get cart item details for Midtrans
     */
    private function getCartItemDetails(array $cartItems): array
    {
        $items = [];
        
        foreach ($cartItems as $item) {
            $items[] = [
                'id' => $item['product_id'],
                'price' => (int) $item['price'],
                'quantity' => $item['quantity'],
                'name' => $item['name'],
                'category' => $item['category'] ?? 'Food',
            ];
        }

        return $items;
    }

    /**
     * Handle notification from Midtrans
     */
    public function handleNotification(array $notification): bool
    {
        try {
            $transactionStatus = $notification['transaction_status'];
            $fraudStatus = $notification['fraud_status'] ?? null;
            $transactionId = $notification['transaction_id'];
            $orderId = $notification['order_id'];

            // Check if this is a successful payment for an order
            if (str_starts_with($orderId, 'ORDER-') && $this->shouldMarkAsVerified($transactionStatus, $fraudStatus)) {
                // Check if order already exists to prevent duplicates
                $existingPayment = Payment::where('order_id_midtrans', $orderId)->first();
                if ($existingPayment) {
                    \Log::info('Order already exists for transaction: ' . $orderId);
                    return true;
                }
                
                // Create the actual order from payment success
                $order = $this->createOrderFromPayment($notification);
                
                if ($order) {
                    // Create payment record for the new order
                    Payment::create([
                        'order_id' => $order->id,
                        'payment_type' => 'snap',
                        'transaction_id' => $transactionId,
                        'order_id_midtrans' => $orderId,
                        'payment_method' => $notification['payment_type'] ?? null,
                        'gross_amount' => $notification['gross_amount'],
                        'transaction_status' => $transactionStatus,
                        'fraud_status' => $fraudStatus,
                        'transaction_time' => now(),
                        'midtrans_response' => $notification,
                        'verified_at' => now(),
                    ]);
                }
            } else {
                // Handle existing order payment updates
                $payment = Payment::where('order_id_midtrans', $orderId)->first();
                
                if ($payment) {
                    $payment->update([
                        'transaction_id' => $transactionId,
                        'payment_method' => $notification['payment_type'] ?? null,
                        'transaction_status' => $transactionStatus,
                        'fraud_status' => $fraudStatus,
                        'transaction_time' => now(),
                        'midtrans_response' => $notification,
                        'verified_at' => $this->shouldMarkAsVerified($transactionStatus, $fraudStatus) ? now() : null,
                    ]);

                    if ($payment->order) {
                        $this->updateOrderStatus($payment->order, $transactionStatus, $fraudStatus);
                    }
                }
            }

            return true;
        } catch (Exception $e) {
            \Log::error('Midtrans notification error: ' . $e->getMessage(), $notification);
            return false;
        }
    }

    /**
     * Create order from successful payment notification
     */
    private function createOrderFromPayment(array $notification): ?Order
    {
        try {
            $orderId = $notification['order_id'];
            
            // Get the original transaction details to retrieve cart data
            $transactionDetails = Transaction::status($orderId);
            $cartItems = json_decode($transactionDetails['custom_field1'] ?? '[]', true);
            $userId = $transactionDetails['custom_field2'] ?? null;
            
            if (empty($cartItems) || !$userId) {
                throw new Exception('Cart data or user ID not found in transaction');
            }
            
            $user = \App\Models\User::find($userId);
            if (!$user) {
                throw new Exception('User not found');
            }
            
            return \Illuminate\Support\Facades\DB::transaction(function () use ($cartItems, $user, $notification) {
                // Create the order
                $order = Order::create([
                    'user_id' => $user->id,
                    'total_price' => $notification['gross_amount'],
                    'address' => $user->address,
                    'phone' => $user->phone,
                    'status' => 'pending', // pending = not shipped yet (payment is already confirmed)
                ]);
                
                // Create order items and update stock
                foreach ($cartItems as $cartItem) {
                    $product = \App\Models\Product::find($cartItem['product_id']);
                    if ($product && $product->stock >= $cartItem['quantity']) {
                        \App\Models\OrderItem::create([
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
                \App\Models\Cart::where('user_id', $user->id)->delete();
                
                return $order;
            });
        } catch (Exception $e) {
            \Log::error('Failed to create order from payment: ' . $e->getMessage(), $notification);
            return null;
        }
    }

    /**
     * Check transaction status from Midtrans
     */
    public function checkTransactionStatus(string $orderId): array
    {
        try {
            return Transaction::status($orderId);
        } catch (Exception $e) {
            throw new Exception('Failed to check transaction status: ' . $e->getMessage());
        }
    }

    /**
     * Determine if payment should be marked as verified
     */
    private function shouldMarkAsVerified(string $transactionStatus, ?string $fraudStatus): bool
    {
        if ($transactionStatus === 'capture') {
            return $fraudStatus === 'accept';
        }

        return in_array($transactionStatus, ['settlement', 'success']);
    }

    /**
     * Update order status based on payment status (for existing orders)
     */
    private function updateOrderStatus(Order $order, string $transactionStatus, ?string $fraudStatus): void
    {
        // For this new flow, orders are only created AFTER payment success
        // So we only handle payment failures/cancellations here
        if (in_array($transactionStatus, ['deny', 'cancel', 'expire', 'failure'])) {
            $order->update(['status' => 'cancelled']);
        }
        // Orders start with 'pending' status (meaning not shipped) after successful payment
    }
}