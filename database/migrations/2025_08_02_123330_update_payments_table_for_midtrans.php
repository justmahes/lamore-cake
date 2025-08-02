<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            // Remove old upload-based columns
            $table->dropColumn(['transfer_to', 'proof_file']);
            
            // Add Midtrans-specific columns
            $table->string('payment_type')->nullable()->after('order_id');
            $table->string('transaction_id')->unique()->nullable()->after('payment_type');
            $table->string('order_id_midtrans')->nullable()->after('transaction_id');
            $table->string('payment_method')->nullable()->after('order_id_midtrans');
            $table->decimal('gross_amount', 10, 2)->nullable()->after('payment_method');
            $table->string('transaction_status')->nullable()->after('gross_amount');
            $table->string('fraud_status')->nullable()->after('transaction_status');
            $table->timestamp('transaction_time')->nullable()->after('fraud_status');
            $table->json('midtrans_response')->nullable()->after('transaction_time');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            // Remove Midtrans columns
            $table->dropColumn([
                'payment_type', 
                'transaction_id', 
                'order_id_midtrans', 
                'payment_method', 
                'gross_amount', 
                'transaction_status', 
                'fraud_status', 
                'transaction_time', 
                'midtrans_response'
            ]);
            
            // Restore old columns
            $table->string('transfer_to')->after('order_id');
            $table->string('proof_file')->nullable()->after('transfer_to');
        });
    }
};
