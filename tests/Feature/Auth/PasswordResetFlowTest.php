<?php

use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;

test('user can request reset link and reset password; new password persists', function () {
    Notification::fake();

    $user = User::factory()->create();

    // Request reset link via named route
    $this->post(route('password.email'), ['email' => $user->email])
        ->assertSessionHasNoErrors();

    // Assert notification sent and use token to reset
    Notification::assertSentTo($user, ResetPassword::class, function ($notification) use ($user) {
        $newPassword = 'new-strong-password';

        $response = $this->post(route('password.store'), [
            'token' => $notification->token,
            'email' => $user->email,
            'password' => $newPassword,
            'password_confirmation' => $newPassword,
        ]);

        $response->assertSessionHasNoErrors()
                 ->assertRedirect(route('login', absolute: false));

        // Verify new password persisted
        expect(Hash::check($newPassword, $user->refresh()->password))->toBeTrue();

        return true;
    });
});

