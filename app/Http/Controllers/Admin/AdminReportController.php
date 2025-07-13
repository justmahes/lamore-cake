<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OrderItem;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AdminReportController extends Controller
{
    public function salesReport(): Response
    {
        $sales = OrderItem::select(DB::raw('DATE(created_at) as date'), DB::raw('SUM(price * quantity) as total'))
            ->groupBy('date')
            ->get();
        $bestSellers = OrderItem::select('product_id', DB::raw('SUM(quantity) as qty'))
            ->groupBy('product_id')
            ->orderByDesc('qty')
            ->take(5)
            ->with('product')
            ->get();
        return Inertia::render('admin/reports/sales', [
            'sales' => $sales,
            'bestSellers' => $bestSellers,
        ]);
    }
}
