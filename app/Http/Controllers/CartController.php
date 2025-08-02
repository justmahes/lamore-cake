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
                return redirect()->back()->with('error', 'Insufficient stock available.');
            }
            
            $cartItem = Cart::where('user_id', Auth::id())
                           ->where('product_id', $product->id)
                           ->first();
            
            if ($cartItem) {
                $newQuantity = $cartItem->quantity + $quantity;
                if ($product->stock < $newQuantity) {
                    return redirect()->back()->with('error', 'Cannot add more items. Insufficient stock available.');
                }
                $cartItem->update(['quantity' => $newQuantity]);
                return redirect()->back()->with('success', "Updated {$product->name} quantity in cart.");
            } else {
                Cart::create([
                    'user_id' => Auth::id(),
                    'product_id' => $product->id,
                    'quantity' => $quantity
                ]);
                return redirect()->back()->with('success', "{$product->name} added to cart successfully!");
            }
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to add product to cart. Please try again.');
        }
    }

    public function update(Request $request, Cart $cart): RedirectResponse
    {
        try {
            $quantity = (int) $request->input('quantity', 1);
            
            if ($quantity <= 0) {
                return redirect()->back()->with('error', 'Quantity must be greater than 0.');
            }
            
            if ($cart->product->stock < $quantity) {
                return redirect()->back()->with('error', 'Insufficient stock available.');
            }
            
            $cart->update(['quantity' => $quantity]);
            return redirect()->back()->with('success', 'Cart updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to update cart. Please try again.');
        }
    }

    public function remove(Cart $cart): RedirectResponse
    {
        try {
            $productName = $cart->product->name;
            $cart->delete();
            return redirect()->back()->with('success', "{$productName} removed from cart.");
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to remove item from cart. Please try again.');
        }
    }
}
