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

            return redirect()->back()->with('success', "Customer '{$customer->name}' created successfully!");
        } catch (\Illuminate\Validation\ValidationException $e) {
            return redirect()->back()->with('error', 'Validation failed. Please check all fields.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to create customer. Please try again.');
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
            return redirect()->back()->with('success', "Customer '{$user->name}' updated successfully!");
        } catch (\Illuminate\Validation\ValidationException $e) {
            return redirect()->back()->with('error', 'Validation failed. Please check all fields.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to update customer. Please try again.');
        }
    }

    public function destroy(User $user): RedirectResponse
    {
        try {
            $customerName = $user->name;
            
            // Check if customer has orders
            if ($user->orders()->exists()) {
                return redirect()->back()->with('warning', "Cannot delete customer '{$customerName}' as they have existing orders.");
            }
            
            $user->delete();
            return redirect()->back()->with('success', "Customer '{$customerName}' deleted successfully!");
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete customer. Please try again.');
        }
    }
}
