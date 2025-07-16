<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        $products = Product::whereNotNull('name')
            ->whereNotNull('price')
            ->whereNotNull('stock')
            ->get();

        if (Auth::check()) {
            return Inertia::render('products/index', [
                'products' => $products,
            ]);
        }

        return Inertia::render('home/products', [
            'products' => $products,
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
