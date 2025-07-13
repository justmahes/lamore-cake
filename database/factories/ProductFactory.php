<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'description' => $this->faker->sentence(8),
            'price' => $this->faker->numberBetween(10000, 50000),
            'stock' => $this->faker->numberBetween(1, 100),
            'image_url' => $this->faker->imageUrl(640, 480, 'cakes', true),
        ];
    }
}
