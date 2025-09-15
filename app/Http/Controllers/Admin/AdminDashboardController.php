<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use App\Models\Order;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        // Summary data for cards
        $summary = [
            'products' => Product::count(),
            'customers' => User::where('role', 'user')->count(),
            'orders' => Order::count(),
            'total_sales' => OrderItem::sum(DB::raw('order_items.price * order_items.quantity')),
        ];

        // Sales data for chart (last 30 days)
        $salesData = OrderItem::select(
            DB::raw('DATE(order_items.created_at) as date'), 
            DB::raw('SUM(order_items.price * order_items.quantity) as total')
        )
        ->where('order_items.created_at', '>=', Carbon::now()->subDays(30))
        ->groupBy('date')
        ->orderBy('date')
        ->get();

        // Product sales data for chart
        $productSalesData = OrderItem::select(
            'order_items.product_id',
            'products.name',
            DB::raw('SUM(order_items.quantity) as qty'),
            DB::raw('SUM(order_items.price * order_items.quantity) as total')
        )
        ->join('products', 'order_items.product_id', '=', 'products.id')
        ->groupBy('order_items.product_id', 'products.name')
        ->orderByDesc('qty')
        ->take(10)
        ->get();

        // Best sellers for table
        $bestSellers = OrderItem::select('order_items.product_id', DB::raw('SUM(order_items.quantity) as qty'))
            ->groupBy('order_items.product_id')
            ->orderByDesc('qty')
            ->take(10)
            ->with('product')
            ->get();

        // All sales for detailed table
        $allSales = OrderItem::with(['product', 'order.user'])
            ->orderBy('order_items.created_at', 'desc')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'product_name' => $item->product?->name ?? '-',
                    'customer_name' => $item->order?->user?->name ?? '-',
                    'customer_postal_code' => $item->order?->user?->postal_code ?? null,
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                    'total' => $item->price * $item->quantity,
                    'date' => $item->created_at->format('Y-m-d H:i:s'),
                ];
            });

        return Inertia::render('admin/dashboard', [
            'summary' => $summary,
            'salesData' => $salesData,
            'productSalesData' => $productSalesData,
            'bestSellers' => $bestSellers,
            'allSales' => $allSales,
        ]);
    }

    public function invoice(): Response
    {
        // Get all sales data for invoice
        $allSales = OrderItem::with(['product', 'order.user'])
            ->orderBy('order_items.created_at', 'desc')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->order?->id ?? $item->id,
                    'product_name' => $item->product?->name ?? '-',
                    'customer_name' => $item->order?->user?->name ?? '-',
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                    'total' => $item->price * $item->quantity,
                    'date' => $item->created_at->format('Y-m-d H:i:s'),
                ];
            });

        // Summary data
        $summary = [
            'products' => Product::count(),
            'customers' => User::where('role', 'user')->count(),
            'orders' => Order::count(),
            'total_sales' => OrderItem::sum(DB::raw('order_items.price * order_items.quantity')),
        ];

        // Date range for the invoice
        $dateRange = [
            'start' => OrderItem::min('created_at') ? Carbon::parse(OrderItem::min('created_at'))->format('d M Y') : 'N/A',
            'end' => Carbon::now()->format('d M Y'),
        ];

        return Inertia::render('admin/invoice', [
            'salesData' => $allSales,
            'summary' => $summary,
            'dateRange' => $dateRange,
        ]);
    }
}
