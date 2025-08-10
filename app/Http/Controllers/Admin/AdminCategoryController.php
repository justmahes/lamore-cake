<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminCategoryController extends Controller
{
    public function index(): Response
    {
        $categories = Category::latest()->get();
        
        return Inertia::render('admin/categories/index', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255|unique:categories',
            'deskripsi' => 'nullable|string|max:500',
        ]);

        Category::create([
            'nama' => $request->nama,
            'deskripsi' => $request->deskripsi,
        ]);

        return redirect()->back()->with('success', 'Kategori berhasil ditambahkan!');
    }

    public function update(Request $request, Category $category)
    {
        $request->validate([
            'nama' => 'required|string|max:255|unique:categories,nama,' . $category->id,
            'deskripsi' => 'nullable|string|max:500',
        ]);

        $category->update([
            'nama' => $request->nama,
            'deskripsi' => $request->deskripsi,
        ]);

        return redirect()->back()->with('success', 'Kategori berhasil diperbarui!');
    }

    public function destroy(Category $category)
    {
        $category->delete();
        
        return redirect()->back()->with('success', 'Kategori berhasil dihapus!');
    }
}
