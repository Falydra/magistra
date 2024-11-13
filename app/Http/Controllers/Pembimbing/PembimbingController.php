<?php

namespace App\Http\Controllers\Pembimbing;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pembimbing;
use Inertia\Inertia;

class PembimbingController extends Controller {
    
        public function index() {
            return Inertia::render('Pembimbing/Dashboard');
        }

        public function persetujuanIRS(){
            return Inertia::render('Pembimbing/PersetujuanIRS');
        }
    
        public function create() {
            return view('pembimbing.create');
        }
    
        public function store(Request $request) {
            $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|min:8',
                'role' => 'required|string',
            ]);
    
            $user = new Pembimbing();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = bcrypt($request->password);
            $user->role = $request->role; // Assign the role from the request
            $user->save();
    
            return redirect()->route('pembimbing.dashboard')->with('success', 'Pembimbing created successfully.');
        }
}