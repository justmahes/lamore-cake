<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class TransactionController extends Controller
{
    public function index(): Response
    {
        // Expire pending orders whose expires_at passed
        \App\Models\Order::where('status', 'pending')
            ->whereNotNull('expires_at')
            ->where('expires_at', '<', now())
            ->update(['status' => 'failed']);

        $orders = Order::where('user_id', Auth::id())->with('payment', 'items.product')->latest()->get();

        // Pending payments (session + persistent DB)
        $pending = session('pending_payment');
        $pendingList = [];
        if ($pending) {
            $pendingList[] = [
                'order_id' => $pending['order_id'] ?? null,
                'redirect_url' => $pending['redirect_url'] ?? null,
                'total_amount' => $pending['total_amount'] ?? null,
                'created_at' => now()->toDateTimeString(),
            ];
        }

        $dbPendings = \App\Models\PendingPayment::where('user_id', Auth::id())
            ->orderByDesc('created_at')
            ->get(['midtrans_order_id as order_id', 'redirect_url', 'amount as total_amount', 'created_at'])
            ->toArray();

        // Merge, de-duplicate, and filter only those whose order still pending
        $merged = collect($pendingList)->concat($dbPendings)
            ->filter(fn($x) => !empty($x['order_id']) && !empty($x['redirect_url']))
            ->unique('order_id')
            ->values();

        $orderIds = $merged->pluck('order_id')->all();
        $statusMap = \App\Models\Order::whereIn('midtrans_order_id', $orderIds)
            ->pluck('status', 'midtrans_order_id');

        $merged = $merged->filter(function ($p) use ($statusMap) {
            $status = $statusMap[$p['order_id']] ?? null;
            return $status === 'pending';
        })->values()->all();

        // Map resume URL into orders by matching midtrans_order_id
        $resumeMap = collect($merged)->keyBy('order_id');
        $ordersTransformed = $orders->map(function ($o) use ($resumeMap) {
            $o->resume_url = $o->midtrans_order_id ? ($resumeMap[$o->midtrans_order_id]['redirect_url'] ?? null) : null;
            return $o;
        });

        return Inertia::render('orders/history', [
            'orders' => $ordersTransformed,
            'pending_payments' => $merged,
        ]);
    }

    public function show(Order $order): Response
    {
        $order->load('items.product', 'payment');
        return Inertia::render('orders/show', [
            'order' => $order,
        ]);
    }
}
