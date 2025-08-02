<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'payment_type',
        'transaction_id',
        'order_id_midtrans',
        'payment_method',
        'gross_amount',
        'transaction_status',
        'fraud_status',
        'transaction_time',
        'midtrans_response',
        'verified_at',
    ];

    protected $casts = [
        'verified_at' => 'datetime',
        'transaction_time' => 'datetime',
        'midtrans_response' => 'array',
        'gross_amount' => 'decimal:2',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
