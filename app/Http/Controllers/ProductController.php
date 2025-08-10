<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Product::with('category')
            ->whereNotNull('name')
            ->whereNotNull('price')
            ->whereNotNull('stock');

        if ($request->has('category') && $request->category !== 'all') {
            if ($request->category) {
                $query->whereHas('category', function($q) use ($request) {
                    $q->where('nama', $request->category);
                });
            }
        }

        $products = $query->get();
        $categories = Category::all()->pluck('nama');

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
