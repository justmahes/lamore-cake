<?php

use App\Http\Controllers\Admin\AdminOrderController;
use App\Http\Controllers\Admin\AdminProductController;
use App\Http\Controllers\Admin\AdminCustomerController;
use App\Http\Controllers\Admin\AdminReportController;
use App\Http\Middleware\HandleRole;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/admin', function () {
    return Inertia::render('home/about');
})->middleware(HandleRole::class);

Route::middleware(['auth', HandleRole::class])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/products', [AdminProductController::class, 'index'])->name('products.index');
    Route::post('/products', [AdminProductController::class, 'store'])->name('products.store');
    Route::post('/products/{product}', [AdminProductController::class, 'update'])->name('products.update');
    Route::delete('/products/{product}', [AdminProductController::class, 'destroy'])->name('products.destroy');

    Route::get('/orders', [AdminOrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{order}', [AdminOrderController::class, 'show'])->name('orders.show');
    Route::patch('/orders/{order}/verify-payment', [AdminOrderController::class, 'verifyPayment'])->name('orders.verify_payment');
    Route::patch('/orders/{order}/status', [AdminOrderController::class, 'updateStatus'])->name('orders.update_status');
    Route::delete('/orders/{order}', [AdminOrderController::class, 'destroy'])->name('orders.destroy');

    Route::get('/reports/sales', [AdminReportController::class, 'salesReport'])->name('reports.sales');

    Route::get('/customers', [AdminCustomerController::class, 'index'])->name('customers.index');
    Route::post('/customers', [AdminCustomerController::class, 'store'])->name('customers.store');
    Route::put('/customers/{user}', [AdminCustomerController::class, 'update'])->name('customers.update');
    Route::delete('/customers/{user}', [AdminCustomerController::class, 'destroy'])->name('customers.destroy');
});
