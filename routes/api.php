<?php

use Illuminate\Support\Facades\Route;

Route::get('/postal-code', function () {
    $city = strtolower((string) request('city', ''));
    $area = strtolower(trim((string) request('area', '')));

    if ($city !== 'denpasar' || $area === '') {
        return response()->json(['message' => 'Invalid parameters'], 422);
    }

    $map = config('postal.denpasar');

    // normalisasi area: "utara", "timur", "barat", "selatan"
    $normalized = match ($area) {
        'utara', 'denpasar utara' => 'utara',
        'timur', 'denpasar timur' => 'timur',
        'barat', 'denpasar barat' => 'barat',
        'selatan', 'denpasar selatan' => 'selatan',
        default => $area,
    };

    $code = $map[$normalized] ?? null;

    if (!$code) {
        return response()->json(['message' => 'Postal code not found'], 404);
    }

    return response()->json(['postal_code' => (string) $code]);
});

