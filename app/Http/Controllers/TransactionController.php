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
        $orders = Order::where('user_id', Auth::id())->with('payment')->latest()->get();
        return Inertia::render('orders/history', [
            'orders' => $orders,
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
