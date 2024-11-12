<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login');
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $credentials = $request->only('email', 'password');

        // Attempt to authenticate the user
        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            // Regenerate the session to prevent session fixation
            $request->session()->regenerate();

            // Redirect based on user role
            if ($user->role == 'admin') {
                return redirect()->route('admin.dashboard');
            } else if ($user->role == 'mahasiswa') {
                return redirect()->route('mahasiswa.dashboard');
            } else if ($user->role == 'pembimbing') {
                return redirect()->route('pembimbing.dashboard');
            } else if ($user->role == 'dekan') {
                return redirect()->route('dekan.dashboard');
            } else if ($user->role == 'kaprodi') {
                return redirect()->route('kaprodi.dashboard');
            }
            
            return redirect()->intended('/user/dashboard');
        }

        // If authentication fails, redirect back with an error
        return back()->withErrors([
            'username' => 'Username atau password salah.',
        ]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('welcome');
    }
}
