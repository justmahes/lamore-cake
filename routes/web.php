<?php

use App\Http\Controllers\Admin\AdminOrderController;
use App\Http\Controllers\Admin\AdminProductController;
use App\Http\Controllers\Admin\AdminCustomerController;
use App\Http\Controllers\Admin\AdminReportController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TransactionController;
use App\Http\Middleware\HandleRole;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get("/", function () {
    return Inertia::render("home/index");
})->name("home");

Route::get("/home", function () {
    return Inertia::render("home/index");
});

Route::get("/gallery", function () {
    return Inertia::render("home/gallery");
});

Route::get("/about", function () {
    return Inertia::render("home/about");
});

Route::get("/admin", function () {
    return Inertia::render("home/about");
})->middleware(HandleRole::class);

Route::middleware(["auth", "verified"])->group(function () {
    Route::get("dashboard", function () {
        $user = auth()->user();
        if ($user->role === 'admin') {
            return Inertia::render('dashboard', [
                'summary' => [
                    'products' => \App\Models\Product::count(),
                    'orders' => \App\Models\Order::count(),
                    'customers' => \App\Models\User::where('role', 'user')->count(),
                ],
            ]);
        }

        return Inertia::render('dashboard');
    })->name("dashboard");
});

require __DIR__ . "/settings.php";
require __DIR__ . "/auth.php";

// user routes
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');

// Route::get('/about', [CompanyProfileController::class, 'showAbout'])->name('about');
// Route::get('/gallery', [CompanyProfileController::class, 'showGallery'])->name('gallery');

Route::middleware(['auth'])->group(function () {
    Route::post('/cart/add/{product}', [CartController::class, 'add'])->name('cart.add');
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::patch('/cart/update/{cart}', [CartController::class, 'update'])->name('cart.update');
    Route::delete('/cart/remove/{cart}', [CartController::class, 'remove'])->name('cart.remove');

    Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
    Route::post('/checkout', [CheckoutController::class, 'processCheckout'])->name('checkout.process');

    Route::get('/payment/upload/{order}', [PaymentController::class, 'showUploadForm'])->name('payment.upload.form');
    Route::post('/payment/upload/{order}', [PaymentController::class, 'uploadProof'])->name('payment.upload');

    Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions.index');
    Route::get('/transactions/{order}', [TransactionController::class, 'show'])->name('transactions.show');
});

// admin routes
Route::middleware(['auth', HandleRole::class])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/products', [AdminProductController::class, 'index'])->name('products.index');
    Route::post('/products', [AdminProductController::class, 'store'])->name('products.store');
    Route::put('/products/{product}', [AdminProductController::class, 'update'])->name('products.update');
    Route::delete('/products/{product}', [AdminProductController::class, 'destroy'])->name('products.destroy');

    Route::get('/orders', [AdminOrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{order}', [AdminOrderController::class, 'show'])->name('orders.show');
    Route::patch('/orders/{order}/verify-payment', [AdminOrderController::class, 'verifyPayment'])->name('orders.verify_payment');

    Route::get('/reports/sales', [AdminReportController::class, 'salesReport'])->name('reports.sales');

    Route::get('/customers', [AdminCustomerController::class, 'index'])->name('customers.index');
    Route::post('/customers', [AdminCustomerController::class, 'store'])->name('customers.store');
    Route::put('/customers/{user}', [AdminCustomerController::class, 'update'])->name('customers.update');
    Route::delete('/customers/{user}', [AdminCustomerController::class, 'destroy'])->name('customers.destroy');
});
