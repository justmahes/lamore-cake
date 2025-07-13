<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::where('role', 'user')->first();

        if ($user) {
            Order::create([
                'user_id' => $user->id,
                'total_price' => 30000,
                'address' => 'Jl. Merdeka No.1',
                'phone' => '08123456789',
            ]);
        }
    }
}
