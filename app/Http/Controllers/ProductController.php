<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Product::whereNotNull('name')
            ->whereNotNull('price')
            ->whereNotNull('stock');

        if ($request->has('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        $products = $query->get();
        $categories = Product::whereNotNull('category')
            ->distinct()
            ->pluck('category')
            ->filter()
            ->values();

        if (Auth::check()) {
            return Inertia::render('products/index', [
                'products' => $products,
                'categories' => $categories,
                'selectedCategory' => $request->get('category', 'all'),
            ]);
        }

        return Inertia::render('home/products', [
            'products' => $products,
            'categories' => $categories,
            'selectedCategory' => $request->get('category', 'all'),
        ]);
    }

    public function show(Product $product): Response
    {
        return Inertia::render('products/show', [
            'product' => $product,
        ]);
    }

    public function guestShow(Product $product): Response
    {
        return Inertia::render('home/product', [
            'product' => $product,
        ]);
    }
}
