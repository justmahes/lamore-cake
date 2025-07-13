<?php

namespace Database\Factories;

use App\Models\Gallery;
use Illuminate\Database\Eloquent\Factories\Factory;

class GalleryFactory extends Factory
{
    protected $model = Gallery::class;

    public function definition(): array
    {
        return [
            'image_url' => $this->faker->imageUrl(640, 480, 'cakes', true),
            'caption' => $this->faker->sentence(5),
            'type' => 'product',
        ];
    }
}
