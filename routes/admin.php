<?php

use App\Http\Controllers\Admin\AdminOrderController;
use App\Http\Controllers\Admin\AdminProductController;
use App\Http\Controllers\Admin\AdminCustomerController;
use App\Http\Controllers\Admin\AdminReportController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminCategoryController;
use App\Http\Middleware\HandleRole;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;


Route::middleware(['auth', HandleRole::class])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::get('/invoice', [AdminDashboardController::class, 'invoice'])->name('invoice');
    Route::get('/products', [AdminProductController::class, 'index'])->name('products.index');
    Route::post('/products', [AdminProductController::class, 'store'])->name('products.store');
    Route::post('/products/{product}', [AdminProductController::class, 'update'])->name('products.update');
    Route::delete('/products/{product}', [AdminProductController::class, 'destroy'])->name('products.destroy');
    Route::post('/products/{id}/restore', [AdminProductController::class, 'restore'])->name('products.restore');
    Route::delete('/products/{id}/force', [AdminProductController::class, 'forceDestroy'])->name('products.forceDestroy');
    Route::put('/products/{product}/stock-zero', [AdminProductController::class, 'stockZero'])->name('products.stock_zero');

    Route::get('/categories', [AdminCategoryController::class, 'index'])->name('categories.index');
    Route::post('/categories', [AdminCategoryController::class, 'store'])->name('categories.store');
    Route::put('/categories/{category}', [AdminCategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{category}', [AdminCategoryController::class, 'destroy'])->name('categories.destroy');

    Route::get('/orders', [AdminOrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{order}', [AdminOrderController::class, 'show'])->name('orders.show');
    Route::patch('/orders/{order}/verify-payment', [AdminOrderController::class, 'verifyPayment'])->name('orders.verify_payment');
    Route::post('/orders/{order}/status', [AdminOrderController::class, 'updateStatus'])->name('orders.update_status');
    Route::delete('/orders/{order}', [AdminOrderController::class, 'destroy'])->name('orders.destroy');


    Route::get('/customers', [AdminCustomerController::class, 'index'])->name('customers.index');
    Route::post('/customers', [AdminCustomerController::class, 'store'])->name('customers.store');
    Route::put('/customers/{user}', [AdminCustomerController::class, 'update'])->name('customers.update');
    Route::delete('/customers/{user}', [AdminCustomerController::class, 'destroy'])->name('customers.destroy');

    // Maintenance: clear carts table (admin-only)
    Route::delete('/maintenance/carts/clear', function () {
        try {
            $driver = DB::connection()->getDriverName();
            if (in_array($driver, ['mysql', 'pgsql'])) {
                DB::statement('TRUNCATE TABLE carts');
            } else {
                DB::table('carts')->delete();
            }
            return redirect()->back()->with('success', 'Tabel carts berhasil dibersihkan.');
        } catch (\Throwable $e) {
            return redirect()->back()->with('error', 'Gagal membersihkan tabel carts: ' . $e->getMessage());
        }
    })->name('maintenance.carts.clear');

    // Maintenance: keep only product named "pie belafo" and reset auto-increment
    Route::post('/maintenance/products/keep-pie-belafo', function () {
        try {
            $keep = \App\Models\Product::where('name', 'pie belafo')->first();
            if (!$keep) {
                return redirect()->back()->with('error', "Produk 'pie belafo' tidak ditemukan.");
            }

            $keepId = $keep->id;
            // Delete other products
            \DB::table('products')->where('id', '!=', $keepId)->delete();

            // If its ID is not 1, remap references and set to 1
            if ($keepId !== 1) {
                \DB::table('carts')->where('product_id', $keepId)->update(['product_id' => 1]);
                \DB::table('order_items')->where('product_id', $keepId)->update(['product_id' => 1]);
                \DB::table('products')->where('id', 1)->delete();
                \DB::table('products')->where('id', $keepId)->update(['id' => 1]);
                $keepId = 1;
            }

            // Reset AUTO_INCREMENT to next after max(id)
            $maxId = (int) \DB::table('products')->max('id');
            $next = max(1, $maxId + 1);
            \DB::statement('ALTER TABLE products AUTO_INCREMENT = ' . $next);

            return redirect()->back()->with('success', "Produk dibersihkan. Menyisakan 'pie belafo' (ID {$keepId}). AUTO_INCREMENT berikutnya: {$next}");
        } catch (\Throwable $e) {
            return redirect()->back()->with('error', 'Gagal membersihkan produk: ' . $e->getMessage());
        }
    })->name('maintenance.products.keep_pie_belafo');
});
