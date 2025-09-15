<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Hash;

class AdminCustomerController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/customers/index', [
            'customers' => User::where('role', 'user')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        try {
            $data = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email|max:255',
                'password' => 'required|min:8',
                'phone' => 'nullable|string|max:20',
                'address' => 'nullable|string|max:500',
            ]);

            $data['role'] = 'user';
            $data['password'] = Hash::make($data['password']);
            $customer = User::create($data);

            return redirect()->back()->with('success', "Pelanggan '{$customer->name}' berhasil dibuat.");
        } catch (\Illuminate\Validation\ValidationException $e) {
            return redirect()->back()->with('error', 'Validasi gagal. Mohon periksa semua kolom.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal membuat pelanggan. Silakan coba lagi.');
        }
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        try {
            $data = $request->validate([
                'name' => 'required|string|max:255',
                'email' => "required|email|max:255|unique:users,email,{$user->id}",
                'phone' => 'nullable|string|max:20',
                'address' => 'nullable|string|max:500',
            ]);

            $user->update($data);
            return redirect()->back()->with('success', "Pelanggan '{$user->name}' berhasil diperbarui.");
        } catch (\Illuminate\Validation\ValidationException $e) {
            return redirect()->back()->with('error', 'Validasi gagal. Mohon periksa semua kolom.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal memperbarui pelanggan. Silakan coba lagi.');
        }
    }

    public function destroy(User $user): RedirectResponse
    {
        try {
            $customerName = $user->name;
            
            // Check if customer has orders
            if (method_exists($user, 'orders') && $user->orders()->exists()) {
                return redirect()->back()->with('warning', "Tidak dapat menghapus pelanggan '{$customerName}' karena memiliki pesanan yang masih ada.");
            }
            
            // Cleanup related records that may block deletion
            if (method_exists($user, 'carts')) {
                $user->carts()->delete();
            }

            $user->delete();
            return redirect()->back()->with('success', "Pelanggan '{$customerName}' berhasil dihapus.");
        } catch (\Exception $e) {
            \Log::error('Admin delete customer failed: '.$e->getMessage(), ['user_id' => $user->id ?? null]);
            return redirect()->back()->with('error', 'Gagal menghapus pelanggan. Silakan coba lagi.');
        }
    }
}
