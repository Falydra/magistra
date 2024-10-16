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
        return Inertia::render('Welcome', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
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
            switch ($user->role) {
                case 0: // Student
                    return redirect()->route('student.dashboard'); // Change to appropriate route
                case 1: // Advisory Lecturer
                    return redirect()->route('advisory.dashboard'); // Change to appropriate route
                case 2: // Head of Department
                    return redirect()->route('department.dashboard'); // Change to appropriate route
                case 3: // Head of Faculty
                    return redirect()->route('faculty.dashboard'); // Change to appropriate route
                case 4: // Academic Admin
                default:
                    return redirect()->route('admin.dashboard'); // Change to appropriate route
            }
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
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('home');
    }
}
