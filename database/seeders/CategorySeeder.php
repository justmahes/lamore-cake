<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'nama' => 'Cake',
                'deskripsi' => 'Kue-kue tradisional dan modern'
            ],
            [
                'nama' => 'Pastry',
                'deskripsi' => 'Pastry dan kue kering'
            ],
            [
                'nama' => 'Cookies',
                'deskripsi' => 'Kue kering dan biskuit'
            ],
            [
                'nama' => 'Bread',
                'deskripsi' => 'Roti dan produk bakery'
            ],
            [
                'nama' => 'Dessert',
                'deskripsi' => 'Makanan penutup dan dessert'
            ]
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
