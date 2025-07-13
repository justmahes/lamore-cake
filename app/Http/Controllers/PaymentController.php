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
        $data = $request->validate([
            'proof' => 'required|image',
        ]);

        $path = $request->file('proof')->store('payments', 'public');
        $payment = Payment::updateOrCreate(
            ['order_id' => $order->id],
            [
                'amount' => $order->total_price,
                'proof_of_payment_url' => Storage::url($path),
            ]
        );

        return redirect()->route('transactions.index');
    }
}
