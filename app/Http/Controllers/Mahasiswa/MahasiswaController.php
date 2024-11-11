<?php

namespace App\Http\Controllers\Mahasiswa;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Mahasiswa;
use Inertia\Inertia;


class MahasiswaController extends Controller
{
    public function index()
    {
        $mahasiswa = Mahasiswa::all();
        return Inertia::render('Mahasiswa/Dashboard', ['mahasiswa' => $mahasiswa]);
    }

    public function create()
    {
        return view('mahasiswa.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'nim' => 'required|numeric|unique:mahasiswa,nim',
            'email' => 'required|email|unique:mahasiswa,email',
            'jurusan' => 'required|string',
        ]);

        $mahasiswa = new Mahasiswa;
        $mahasiswa->name = $request->name;
        $mahasiswa->nim = $request->nim;
        $mahasiswa->email = $request->email;
        $mahasiswa->jurusan = $request->jurusan;
        $mahasiswa->save();

        return redirect()->route('mahasiswa.dashboard')->with('success', 'Mahasiswa created successfully.');
    }
}