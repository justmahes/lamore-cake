<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();
        
        if ($user->role === 'admin') {
            return $this->adminDashboard();
        }

        if ($user->role === 'user') {
            return $this->userDashboard($user);
        }

        return Inertia::render('dashboard');
    }

    private function adminDashboard(): Response
    {
        $summary = [
            'products' => Product::count(),
            'orders' => Order::count(),
            'customers' => User::where('role', 'user')->count(),
        ];

        return Inertia::render('dashboard', [
            'summary' => $summary,
        ]);
    }

    private function userDashboard(User $user): Response
    {
        // User-specific summary data
        $summary = [
            'total_orders' => Order::where('user_id', $user->id)->count(),
            'completed_orders' => Order::where('user_id', $user->id)->where('status', 'completed')->count(),
            'pending_orders' => Order::where('user_id', $user->id)->where('status', 'pending')->count(),
            'total_spent' => OrderItem::whereHas('order', function($query) use ($user) {
                $query->where('user_id', $user->id);
            })->sum(DB::raw('order_items.price * order_items.quantity')),
        ];

        // User's order history for chart (last 30 days)
        $orderData = Order::where('user_id', $user->id)
            ->select(
                DB::raw('DATE(created_at) as date'), 
                DB::raw('COUNT(*) as count'),
                DB::raw('SUM((SELECT SUM(price * quantity) FROM order_items WHERE order_items.order_id = orders.id)) as total')
            )
            ->where('created_at', '>=', Carbon::now()->subDays(30))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // User's favorite products (most ordered)
        $favoriteProducts = OrderItem::select(
            'order_items.product_id',
            'products.name',
            DB::raw('SUM(order_items.quantity) as qty'),
            DB::raw('SUM(order_items.price * order_items.quantity) as total')
        )
        ->join('products', 'order_items.product_id', '=', 'products.id')
        ->join('orders', 'order_items.order_id', '=', 'orders.id')
        ->where('orders.user_id', $user->id)
        ->groupBy('order_items.product_id', 'products.name')
        ->orderByDesc('qty')
        ->take(10)
        ->get();

        // User's detailed order history
        $orderHistory = Order::with(['items.product'])
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get()
            ->flatMap(function ($order) {
                return $order->items->map(function ($item) use ($order) {
                    return [
                        'id' => $item->id,
                        'order_id' => $order->id,
                        'product_name' => $item->product->name,
                        'quantity' => $item->quantity,
                        'price' => $item->price,
                        'total' => $item->price * $item->quantity,
                        'status' => $order->status,
                        'date' => $order->created_at->format('Y-m-d H:i:s'),
                    ];
                });
            });

        return Inertia::render('dashboard', [
            'summary' => $summary,
            'orderData' => $orderData,
            'favoriteProducts' => $favoriteProducts,
            'orderHistory' => $orderHistory,
        ]);
    }
}