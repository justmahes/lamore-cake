<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        $user = $request->user();
        
        if ($user->hasVerifiedEmail()) {
            $dashboardRoute = $user->role === 'admin' ? 'admin.dashboard' : 'dashboard';
            return redirect()->intended(route($dashboardRoute, absolute: false).'?verified=1');
        }

        if ($user->markEmailAsVerified()) {
            /** @var \Illuminate\Contracts\Auth\MustVerifyEmail $user */
            event(new Verified($user));
        }

        $dashboardRoute = $user->role === 'admin' ? 'admin.dashboard' : 'dashboard';
        return redirect()->intended(route($dashboardRoute, absolute: false).'?verified=1');
    }
}
