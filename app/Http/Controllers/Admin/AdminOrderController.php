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
            'orders' => Order::with('payment')->latest()->get(),
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
        $payment = $order->payment;
        $payment->update(['verified_at' => now()]);
        $order->update(['status' => $request->input('status', 'processed')]);
        return redirect()->back();
    }
}
