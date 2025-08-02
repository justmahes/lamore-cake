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
                return redirect()->back()->with('error', 'No payment found for this order.');
            }
            
            if ($payment->verified_at) {
                return redirect()->back()->with('warning', 'Payment has already been verified.');
            }
            
            // For Midtrans payments, check if already processed
            if ($payment->transaction_status === 'settlement' || $payment->transaction_status === 'capture') {
                return redirect()->back()->with('info', 'This payment has already been processed by Midtrans.');
            }
            
            $payment->update(['verified_at' => now()]);
            $order->update(['status' => 'paid']);
            
            return redirect()->back()->with('success', "Payment for Order #{$order->id} verified successfully!");
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to verify payment. Please try again.');
        }
    }

    public function updateStatus(Request $request, Order $order): RedirectResponse
    {
        try {
            $status = $request->input('status');
            $validStatuses = ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'];
            
            if (!in_array($status, $validStatuses, true)) {
                return redirect()->back()->with('error', 'Invalid order status provided.');
            }

            $oldStatus = $order->status;
            $order->update(['status' => $status]);

            return redirect()->back()->with('success', "Order #{$order->id} status updated from '{$oldStatus}' to '{$status}' successfully!");
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to update order status. Please try again.');
        }
    }

    public function destroy(Order $order): RedirectResponse
    {
        try {
            $orderId = $order->id;
            
            if ($order->status === 'shipped' || $order->status === 'delivered') {
                return redirect()->back()->with('warning', "Cannot delete Order #{$orderId} as it has already been shipped or delivered.");
            }
            
            $order->delete();

            return redirect()->back()->with('success', "Order #{$orderId} deleted successfully!");
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete order. Please try again.');
        }
    }
}
