<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ProductsKeepPieBelafo extends Command
{
    protected $signature = 'products:keep-pie-belafo {--reset=1 : Reset AUTO_INCREMENT to this value (default 1)}';
    protected $description = "Hapus semua produk kecuali 'pie belafo' dan reset AUTO_INCREMENT";

    public function handle(): int
    {
        $this->info("Membersihkan tabel products, menyisakan 'pie belafo'...");

        $keep = DB::table('products')->where('name', 'pie belafo')->first();
        if (!$keep) {
            $this->error("Produk 'pie belafo' tidak ditemukan.");
            return self::FAILURE;
        }

        try {
            $resetTo = (int) $this->option('reset') ?: 1;
            DB::transaction(function () use (&$keep, $resetTo) {
                $keepId = (int) $keep->id;

                // Hapus produk lain
                DB::table('products')->where('id', '!=', $keepId)->delete();

                // Jika ID bukan 1, pindahkan referensi dan set ID ke 1
                if ($keepId !== 1) {
                    DB::table('carts')->where('product_id', $keepId)->update(['product_id' => 1]);
                    DB::table('order_items')->where('product_id', $keepId)->update(['product_id' => 1]);
                    DB::table('products')->where('id', 1)->delete();
                    DB::table('products')->where('id', $keepId)->update(['id' => 1]);
                    $keepId = 1;
                }

                // Reset AUTO_INCREMENT
                DB::statement('ALTER TABLE products AUTO_INCREMENT = ' . $resetTo);
            });
            $this->info("Sukses. Menyisakan 'pie belafo'. AUTO_INCREMENT diset ke {$resetTo}.");
            return self::SUCCESS;
        } catch (\Throwable $e) {
            $this->error('Gagal: ' . $e->getMessage());
            return self::FAILURE;
        }
    }
}
