<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PaymentController extends Controller
{
    public function showUploadForm(Order $order): Response
    {
        return Inertia::render('payment/upload', [
            'order' => $order,
        ]);
    }

    public function uploadProof(Request $request, Order $order): RedirectResponse
    {
        $request->validate([
            'proof' => 'required|image',
        ]);

        $path = $request->file('proof')->store('payments', 'public');
        Payment::updateOrCreate(
            ['order_id' => $order->id],
            [
                'transfer_to' => 'BCA 1234567890',
                'proof_file' => Storage::url($path),
            ]
        );

        return redirect()->route('transactions.index');
    }
}
