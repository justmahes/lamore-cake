<?php

namespace App\Http\Controllers;

use App\Services\MidtransService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    protected MidtransService $midtransService;

    public function __construct(MidtransService $midtransService)
    {
        $this->midtransService = $midtransService;
    }

    /**
     * Handle Midtrans notification webhook
     */
    public function notification(Request $request): JsonResponse
    {
        try {
            $notification = $request->all();

            // Verify notification authenticity
            $serverKey = config('midtrans.server_key');
            $hashed = hash('sha512', $notification['order_id'] . $notification['status_code'] . $notification['gross_amount'] . $serverKey);

            if ($hashed !== $notification['signature_key']) {
                return response()->json(['status' => 'error', 'message' => 'Invalid signature'], 403);
            }

            $result = $this->midtransService->handleNotification($notification);

            return response()->json([
                'status' => $result ? 'success' : 'error',
                'message' => $result ? 'Notification processed' : 'Failed to process notification'
            ]);
        } catch (\Exception $e) {
            Log::error('Midtrans notification error: ' . $e->getMessage());
            return response()->json(['status' => 'error', 'message' => 'Internal server error'], 500);
        }
    }

    /**
     * Handle payment redirect from Midtrans
     */
    public function redirect(Request $request): RedirectResponse
    {
        $status = $request->get('status', 'unknown');
        $orderId = $request->get('order_id');

        // Handle temporary order IDs (before order creation)
        if ($orderId && str_starts_with($orderId, 'TEMP-')) {
            switch ($status) {
                case 'success':
                    return redirect()->route('transactions.index')
                        ->with('success', 'Pembayaran berhasil! Pesanan Anda telah dibuat dan menunggu pengiriman.');
                case 'failed':
                    return redirect()->route('cart.index')
                        ->with('error', 'Pembayaran gagal. Silakan coba lagi atau hubungi dukungan.');
                case 'pending':
                default:
                    return redirect()->route('transactions.index')
                        ->with('info', 'Pembayaran sedang diproses. Pesanan Anda akan dibuat setelah pembayaran dikonfirmasi.');
            }
        }

        // Extract order ID from Midtrans order ID if provided (for existing orders)
        if ($orderId && str_starts_with($orderId, 'ORDER-')) {
            $parts = explode('-', $orderId);
            $orderDbId = $parts[1] ?? null;

            if ($orderDbId) {
                $order = \App\Models\Order::find($orderDbId);
                if ($order && $order->user_id === auth()->id()) {
                    switch ($status) {
                        case 'success':
                            return redirect()->route('transactions.show', $order)
                                ->with('success', 'Pembayaran berhasil! Terima kasih atas pesanan Anda.');
                        case 'failed':
                            return redirect()->route('transactions.show', $order)
                                ->with('error', 'Pembayaran gagal. Silakan coba lagi atau hubungi dukungan.');
                        case 'pending':
                        default:
                            return redirect()->route('transactions.show', $order)
                                ->with('info', 'Pembayaran sedang diproses. Anda akan menerima konfirmasi setelah pembayaran selesai.');
                    }
                }
            }
        }

        // Fallback redirect
        switch ($status) {
            case 'success':
                return redirect()->route('transactions.index')
                    ->with('success', 'Pembayaran berhasil!');
            case 'failed':
                return redirect()->route('cart.index')
                    ->with('error', 'Pembayaran gagal. Silakan coba lagi.');
            case 'pending':
            default:
                return redirect()->route('transactions.index')
                    ->with('info', 'Pembayaran sedang diproses.');
        }
    }
}
