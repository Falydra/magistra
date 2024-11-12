<?php

namespace App\Http\Controllers\Kaprodi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Kaprodi;
use Inertia\Inertia;

class KaprodiController extends Controller {
    
        public function index() {
            return Inertia::render('Kaprodi/Dashboard');
        }
    
        public function create() {
            return view('kaprodi.create');
        }
    
        public function store(Request $request) {
            $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|min:8',
                'role' => 'required|string',
            ]);
    
            $user = new User;
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = bcrypt($request->password);
            $user->role = $request->role; // Assign the role from the request
            $user->save();
    
            return redirect()->route('kaprodi.dashboard')->with('success', 'Kaprodi created successfully.');
        }
}