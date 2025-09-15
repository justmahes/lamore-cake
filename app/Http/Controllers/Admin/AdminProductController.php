<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminProductController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/products/index', [
            'products' => Product::with('category')->get(),
            'categories' => Category::all(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        try {
            $data = $request->validate([
                'name' => 'required|string|max:255',
                'kategori' => 'nullable|string|max:100',
                'kategori_id' => 'nullable|exists:categories,id',
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
            return redirect()->back()->with('success', "Produk '{$product->name}' berhasil dibuat.");
        } catch (\Illuminate\Validation\ValidationException $e) {
            return redirect()->back()->with('error', 'Validasi gagal. Mohon periksa semua kolom yang wajib diisi.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal membuat produk. Silakan coba lagi.');
        }
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        try {
            $data = $request->validate([
                'name' => 'required|string|max:255',
                'kategori' => 'nullable|string|max:100',
                'kategori_id' => 'nullable|exists:categories,id',
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
            return redirect()->back()->with('success', "Produk '{$product->name}' berhasil diperbarui.");
        } catch (\Illuminate\Validation\ValidationException $e) {
            return redirect()->back()->with('error', 'Validasi gagal. Mohon periksa semua kolom yang wajib diisi.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal memperbarui produk. Silakan coba lagi.');
        }
    }

    public function destroy(Product $product): RedirectResponse
    {
        try {
            $productName = $product->name;
            
            // Check if product is in any cart or order
            if ($product->carts()->exists() || $product->orderItems()->exists()) {
                return redirect()->back()->with('warning', "Tidak dapat menghapus '{$productName}' karena digunakan pada pesanan atau keranjang. Pertimbangkan menandainya sebagai stok habis.");
            }
            
            $product->delete();
            return redirect()->back()->with('success', "Produk '{$productName}' berhasil dihapus.");
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal menghapus produk. Silakan coba lagi.');
        }
    }
}
