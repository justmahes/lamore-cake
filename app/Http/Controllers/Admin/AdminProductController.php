<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminProductController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/products/index', [
            'products' => Product::all(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'nullable',
            'description' => 'nullable',
            'price' => 'nullable|numeric',
            'stock' => 'nullable|numeric',
            'image' => 'nullable|image',
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $data['image'] = 'data:' . $file->getMimeType() . ';base64,' . base64_encode($file->get());
        }

        Product::create($data);
        return redirect()->back()->with('success', 'Product created');
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'nullable',
            'description' => 'nullable',
            'price' => 'nullable|numeric',
            'stock' => 'nullable|numeric',
            'image' => ['nullable', 'image'],
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $data['image'] = 'data:' . $file->getMimeType() . ';base64,' . base64_encode($file->get());
        } else {
            unset($data['image']);
        }

        $product->update($data);
        return redirect()->back()->with('success', 'Product updated');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();
        return redirect()->back()->with('success', 'Product deleted');
    }
}
