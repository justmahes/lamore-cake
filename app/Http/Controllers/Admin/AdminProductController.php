<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Response;

class AdminProductController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/products/index', [
            'products' => Product::with('category')->get(),
            'trashed' => Product::onlyTrashed()->with('category')->get(),
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
                'expires_at' => 'nullable|date',
            ]);

            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('products', 'public');
                $data['image'] = $path;
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
                'expires_at' => 'nullable|date',
            ]);

            if ($request->hasFile('image')) {
                $oldImage = $product->getRawOriginal('image');
                $path = $request->file('image')->store('products', 'public');
                $data['image'] = $path;

                if ($oldImage && !Str::startsWith($oldImage, ['data:', 'http://', 'https://'])) {
                    Storage::disk('public')->delete($oldImage);
                }
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
            
            // Automatically remove this product from all carts to allow deletion
            $removed = $product->carts()->count();
            $product->carts()->delete();

            $product->delete();
            $msg = $removed > 0
                ? "Produk '{$productName}' berhasil dihapus dan dikeluarkan dari {$removed} keranjang."
                : "Produk '{$productName}' berhasil dihapus.";
            return redirect()->back()->with('success', $msg);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal menghapus produk. Silakan coba lagi.');
        }
    }

    public function restore(string $id): RedirectResponse
    {
        try {
            $product = Product::withTrashed()->findOrFail($id);
            $product->restore();
            return redirect()->back()->with('success', "Produk '{$product->name}' berhasil dipulihkan.");
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal memulihkan produk. Silakan coba lagi.');
        }
    }

    public function forceDestroy(string $id): RedirectResponse
    {
        try {
            $product = Product::withTrashed()->findOrFail($id);
            // Clean up related cart items before force delete
            $removed = $product->carts()->count();
            $product->carts()->delete();

            $product->forceDelete();
            $msg = $removed > 0
                ? "Produk '{$product->name}' berhasil dihapus permanen dan dikeluarkan dari {$removed} keranjang."
                : "Produk '{$product->name}' berhasil dihapus permanen.";
            return redirect()->back()->with('success', $msg);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal menghapus permanen produk. Silakan coba lagi.');
        }
    }

    public function stockZero(Product $product): RedirectResponse
    {
        try {
            $product->update(['stock' => 0]);
            return redirect()->back()->with('success', "Stok produk '{$product->name}' diset menjadi 0.");
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal mengubah stok produk. Silakan coba lagi.');
        }
    }
}
