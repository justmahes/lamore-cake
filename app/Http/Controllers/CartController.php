<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function index(): Response
    {
        $items = Cart::with('product')
            ->where('user_id', Auth::id())
            ->get();
        $subtotal = $items->sum(fn($i) => $i->product->price * $i->quantity);
        return Inertia::render('cart/index', [
            'cartItems' => $items,
            'subtotal' => $subtotal,
        ]);
    }

    public function add(Request $request, Product $product): RedirectResponse
    {
        try {
            $quantity = (int) $request->input('quantity', 1);
            
            if ($product->stock < $quantity) {
                return redirect()->back()->with('error', 'Stok tidak mencukupi.');
            }
            
            $cartItem = Cart::where('user_id', Auth::id())
                           ->where('product_id', $product->id)
                           ->first();
            
            if ($cartItem) {
                $newQuantity = $cartItem->quantity + $quantity;
                if ($product->stock < $newQuantity) {
                    return redirect()->back()->with('error', 'Tidak dapat menambah item. Stok tidak mencukupi.');
                }
                $cartItem->update(['quantity' => $newQuantity]);
                return redirect()->back()->with('success', "Jumlah {$product->name} di keranjang diperbarui.");
            } else {
                Cart::create([
                    'user_id' => Auth::id(),
                    'product_id' => $product->id,
                    'quantity' => $quantity
                ]);
                return redirect()->back()->with('success', "{$product->name} berhasil ditambahkan ke keranjang.");
            }
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal menambahkan produk ke keranjang. Silakan coba lagi.');
        }
    }

    public function update(Request $request, Cart $cart): RedirectResponse
    {
        try {
            $quantity = (int) $request->input('quantity', 1);
            
            if ($quantity <= 0) {
                return redirect()->back()->with('error', 'Jumlah harus lebih dari 0.');
            }
            
            if ($cart->product->stock < $quantity) {
                return redirect()->back()->with('error', 'Stok tidak mencukupi.');
            }
            
            $cart->update(['quantity' => $quantity]);
            return redirect()->back()->with('success', 'Keranjang berhasil diperbarui.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal memperbarui keranjang. Silakan coba lagi.');
        }
    }

    public function remove(Cart $cart): RedirectResponse
    {
        try {
            $productName = $cart->product->name;
            $cart->delete();
            return redirect()->back()->with('success', "{$productName} dihapus dari keranjang.");
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal menghapus item dari keranjang. Silakan coba lagi.');
        }
    }

    public function clear(): RedirectResponse
    {
        try {
            Cart::where('user_id', Auth::id())->delete();
            return redirect()->back()->with('success', 'Keranjang berhasil dibersihkan.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal membersihkan keranjang. Silakan coba lagi.');
        }
    }
}
