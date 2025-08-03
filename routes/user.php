<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = Auth::user();
        if ($user->role === 'admin') {
            return Inertia::render('dashboard', [
                'summary' => [
                    'products' => \App\Models\Product::count(),
                    'orders' => \App\Models\Order::count(),
                    'customers' => \App\Models\User::where('role', 'user')->count(),
                ],
            ]);
        }

        if ($user->role === 'user') {
            return Inertia::render('dashboard', [
                'summary' => [
                    'orders' => \App\Models\Order::where('user_id', $user->id)->count(),
                ],
            ]);
        }

        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth'])->group(function () {
    Route::post('/cart/add/{product}', [CartController::class, 'add'])->name('cart.add');
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::patch('/cart/update/{cart}', [CartController::class, 'update'])->name('cart.update');
    Route::delete('/cart/remove/{cart}', [CartController::class, 'remove'])->name('cart.remove');

    Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
    Route::post('/checkout', [CheckoutController::class, 'processCheckout'])->name('checkout.process');

    // Payment redirect routes
    Route::get('/payment/redirect', [CheckoutController::class, 'paymentRedirect'])->name('payment.redirect');
    Route::get('/payment/success', [CheckoutController::class, 'paymentSuccess'])->name('payment.success');
    Route::get('/payment/pending', [CheckoutController::class, 'paymentPending'])->name('payment.pending');

    Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions.index');
    Route::get('/transactions/{order}', [TransactionController::class, 'show'])->name('transactions.show');
});
