<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        $products = Product::all();
        return Inertia::render('products/index', [
            'products' => $products,
        ]);
    }

    public function show(Product $product): Response
    {
        return Inertia::render('products/show', [
            'product' => $product,
        ]);
    }
}
