<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnsureUserIsAdmin
{
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check() && Auth::user()->role == 'mahasiswa') { // Check if the user has the admin role
            return $next($request);
        }

        return redirect('/dashboard'); // Redirect non-admin users to the regular dashboard
    }
}