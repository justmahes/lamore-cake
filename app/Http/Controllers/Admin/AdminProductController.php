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
        try {
            $data = $request->validate([
                'name' => 'required|string|max:255',
                'category' => 'nullable|string|max:100',
                'description' => 'nullable|string',
                'price' => 'required|numeric|min:0',
                'stock' => 'required|integer|min:0',
                'image' => 'nullable|image|max:2048',
            ]);

            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $data['image'] = 'data:' . $file->getMimeType() . ';base64,' . base64_encode($file->get());
            }

            $product = Product::create($data);
            return redirect()->back()->with('success', "Product '{$product->name}' created successfully!");
        } catch (\Illuminate\Validation\ValidationException $e) {
            return redirect()->back()->with('error', 'Validation failed. Please check all required fields.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to create product. Please try again.');
        }
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        try {
            $data = $request->validate([
                'name' => 'required|string|max:255',
                'category' => 'nullable|string|max:100',
                'description' => 'nullable|string',
                'price' => 'required|numeric|min:0',
                'stock' => 'required|integer|min:0',
                'image' => 'nullable|image|max:2048',
            ]);

            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $data['image'] = 'data:' . $file->getMimeType() . ';base64,' . base64_encode($file->get());
            } else {
                unset($data['image']);
            }

            $product->update($data);
            return redirect()->back()->with('success', "Product '{$product->name}' updated successfully!");
        } catch (\Illuminate\Validation\ValidationException $e) {
            return redirect()->back()->with('error', 'Validation failed. Please check all required fields.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to update product. Please try again.');
        }
    }

    public function destroy(Product $product): RedirectResponse
    {
        try {
            $productName = $product->name;
            
            // Check if product is in any cart or order
            if ($product->carts()->exists() || $product->orderItems()->exists()) {
                return redirect()->back()->with('warning', "Cannot delete '{$productName}' as it's referenced in orders or carts. Consider marking it as out of stock instead.");
            }
            
            $product->delete();
            return redirect()->back()->with('success', "Product '{$productName}' deleted successfully!");
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete product. Please try again.');
        }
    }
}
