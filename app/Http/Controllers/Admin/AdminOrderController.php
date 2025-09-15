<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminOrderController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/orders/index', [
            'orders' => Order::with(['payment', 'user'])->latest()->get(),
        ]);
    }

    public function show(Order $order): Response
    {
        $order->load('items.product', 'payment', 'user');
        return Inertia::render('admin/orders/show', [
            'order' => $order,
        ]);
    }

    public function verifyPayment(Request $request, Order $order): RedirectResponse
    {
        try {
            $payment = $order->payment;
            
            if (!$payment) {
                return redirect()->back()->with('error', 'Tidak ada pembayaran untuk pesanan ini.');
            }
            
            if ($payment->verified_at) {
                return redirect()->back()->with('warning', 'Pembayaran sudah diverifikasi.');
            }
            
            // For Midtrans payments, check if already processed
            if ($payment->transaction_status === 'settlement' || $payment->transaction_status === 'capture') {
                return redirect()->back()->with('info', 'Pembayaran ini sudah diproses oleh Midtrans.');
            }
            
            $payment->update(['verified_at' => now()]);
            $order->update(['status' => 'paid']);
            
            return redirect()->back()->with('success', "Pembayaran untuk Pesanan #{$order->id} berhasil diverifikasi.");
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal memverifikasi pembayaran. Silakan coba lagi.');
        }
    }

    public function updateStatus(Request $request, Order $order): RedirectResponse
    {
        try {
            $status = $request->input('status');
            $validStatuses = ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'];
            
            if (!in_array($status, $validStatuses, true)) {
                return redirect()->back()->with('error', 'Status pesanan tidak valid.');
            }

            $oldStatus = $order->status;
            $order->update(['status' => $status]);

            return redirect()->back()->with('success', "Status Pesanan #{$order->id} diperbarui dari '{$oldStatus}' ke '{$status}'.");
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal memperbarui status pesanan. Silakan coba lagi.');
        }
    }

    public function destroy(Order $order): RedirectResponse
    {
        try {
            $orderId = $order->id;
            
            if ($order->status === 'shipped' || $order->status === 'delivered') {
                return redirect()->back()->with('warning', "Tidak dapat menghapus Pesanan #{$orderId} karena sudah dikirim atau diterima.");
            }
            
            $order->delete();

            return redirect()->back()->with('success', "Pesanan #{$orderId} berhasil dihapus.");
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal menghapus pesanan. Silakan coba lagi.');
        }
    }
}
