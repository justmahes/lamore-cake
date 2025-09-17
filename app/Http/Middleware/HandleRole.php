<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class HandleRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
            return redirect("/login")->with("error", "Anda harus login untuk mengakses halaman ini.");
        }

        if (Auth::user()->role != "admin") {
            return redirect("/")->with("error", "Anda tidak memiliki akses sebagai administrator.");
        }

        return $next($request);
    }
}
