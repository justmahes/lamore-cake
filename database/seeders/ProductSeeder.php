<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            ['name' => 'Pia Susu', 'category' => 'cakes', 'description' => 'Pia isi susu khas Bali', 'price' => 15000, 'stock' => 50],
            ['name' => 'Pie Bali', 'category' => 'cakes', 'description' => 'Pie renyah rasa kacang', 'price' => 20000, 'stock' => 40],
            ['name' => 'Kacang Disco', 'category' => 'snacks', 'description' => 'Kacang goreng bumbu khas', 'price' => 12000, 'stock' => 60],
            ['name' => 'Bolu Tape', 'category' => 'cakes', 'description' => 'Bolu lembut dari tape', 'price' => 18000, 'stock' => 30],
            ['name' => 'Jaja Wajik', 'category' => 'traditional', 'description' => 'Kue ketan manis tradisional', 'price' => 10000, 'stock' => 70],
            ['name' => 'Salak Bali', 'category' => 'fruits', 'description' => 'Buah salak segar', 'price' => 15000, 'stock' => 80],
            ['name' => 'Sate Lilit', 'category' => 'traditional', 'description' => 'Sate ikan khas Bali', 'price' => 25000, 'stock' => 25],
            ['name' => 'Lawar Kuwir', 'category' => 'traditional', 'description' => 'Lawar khas Bali', 'price' => 22000, 'stock' => 20],
            ['name' => 'Jaje Uli', 'category' => 'traditional', 'description' => 'Kue uli manis', 'price' => 9000, 'stock' => 60],
            ['name' => 'Dadar Gulung', 'category' => 'cakes', 'description' => 'Pancake isi kelapa', 'price' => 8000, 'stock' => 100],
        ];

        foreach ($products as $p) {
            Product::create($p);
        }
    }
}
