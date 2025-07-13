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
        $quantity = (int) $request->input('quantity', 1);
        Cart::updateOrCreate(
            ['user_id' => Auth::id(), 'product_id' => $product->id],
            ['quantity' => $quantity]
        );
        return redirect()->route('cart.index');
    }

    public function update(Request $request, Cart $cart): RedirectResponse
    {
        $cart->update(['quantity' => $request->input('quantity', 1)]);
        return redirect()->back();
    }

    public function remove(Cart $cart): RedirectResponse
    {
        $cart->delete();
        return redirect()->back();
    }
}
