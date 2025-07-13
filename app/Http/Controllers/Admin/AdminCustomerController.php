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
        $data = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:3',
            'phone' => 'nullable',
            'address' => 'nullable',
        ]);

        $data['role'] = 'user';
        $data['password'] = Hash::make($data['password']);
        User::create($data);

        return redirect()->back();
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'phone' => 'nullable',
            'address' => 'nullable',
        ]);

        $user->update($data);
        return redirect()->back();
    }

    public function destroy(User $user): RedirectResponse
    {
        $user->delete();
        return redirect()->back();
    }
}
