<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\Payment;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class PaymentSeeder extends Seeder
{
    public function run(): void
    {
        $order = Order::first();

        if ($order) {
            Payment::create([
                'order_id' => $order->id,
                'transfer_to' => 'BCA 1234567890',
                'proof_file' => null,
                'verified_at' => now(),
            ]);
        }
    }
}
