<?php

namespace App\Http\Controllers\Mahasiswa;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Mahasiswa;
use Inertia\Inertia;
use App\Models\User;


class MahasiswaController extends Controller
{
    public function index()
    {
        $user = auth()->user(); 
        $mahasiswa = $user->mahasiswa; 

        return Inertia::render('Mahasiswa/Dashboard', [
            'mahasiswa' => $mahasiswa
        ]);
    }

    public function create()
    {
        return view('mahasiswa.create');
    }


    public function registrasi() {
    
        return Inertia::render('Mahasiswa/Registrasi');

    }


    public function pembayaran() {
        return Inertia::render('Mahasiswa/Pembayaran');
    }

    public function irs() {
        return Inertia::render('Mahasiswa/IRS');
    }

    public function khs() {
        return Inertia::render('Mahasiswa/KHS');
    }

    public function store(Request $request)
    {
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


        return redirect()->route('mahasiswa.dashboard')->with('success', 'Mahasiswa created successfully.');
    }
}