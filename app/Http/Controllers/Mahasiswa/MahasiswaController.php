<?php

namespace App\Http\Controllers\Mahasiswa;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Mahasiswa;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Pembayaran;
use Illuminate\Support\Facades\DB;


class MahasiswaController extends Controller
{
    public function index()
    {
        $user = auth()->user(); 
        $mahasiswa = Mahasiswa::select('mahasiswa.*')
        ->withSum('irs as sksk', 'total_sks') // Menambahkan atribut `total_sks` hasil SUM
        ->where('nim', $user->mahasiswa->nim)
        ->first();

        return Inertia::render('Mahasiswa/Dashboard', [
            'mahasiswa' => $mahasiswa,
        ]);
    }

    public function create()
    {
        return view('mahasiswa.create');
    }

        public function pembayaran() {

            $user = auth()->user();
            $mahasiswa = $user->mahasiswa;
            $pembayaran = Pembayaran::where('nim', $mahasiswa->nim)->first();

        



            return Inertia::render('Mahasiswa/Pembayaran',[
                'mahasiswa' => $mahasiswa,
                'pembayran' => $pembayaran
            ]);
        }

        public function updateStatusBayar(Request $request) {
            $user = auth()->user();
            $mahasiswa = $user->mahasiswa;
            $pembayaran = Pembayaran::where('nim', $mahasiswa->nim)->first();

            $request->validate([
                'status' => 'required|in:Lunas',
            ]);

            if (!$pembayaran) {
                return back()->withErrors(['pembayaran' => 'Pembayaran tidak ditemukan.']);
            }

            $pembayaran->status = $request->input('status', $pembayaran->status);
            $pembayaran->save();

            return redirect()->route('mahasiswa.pembayaran')->with('success', 'Pembayaran berhasil diupdate');
        }


        public function registrasi() {


            $user = auth()->user();
            $mahasiswa = $user->mahasiswa; 
            return Inertia::render('Mahasiswa/Registrasi', [   
            'mahasiswa' => $mahasiswa,
            
        ]);

        }

        public function updateStatus(Request $request)
        {
            $request->validate([
                'kode_registrasi' => 'required|in:100,001',
            ]);

        
        
            $mahasiswa = auth()->user()->mahasiswa;
            if ($mahasiswa->kode_registrasi !== '000') {
                return back()->witheErrors(['kode' => 'kode registrasi sudah diupdate']);
            }

            
            $mahasiswa->kode_registrasi = $request->input('kode_registrasi', $mahasiswa->kode_registrasi);

            $mahasiswa->save();
            return redirect()->route('mahasiswa.registrasi')->with('success', 'Mahasiswa updated successfully.');
        }


   

    public function irs() {
        $user = auth()->user();
        $mahasiswa = $user->mahasiswa;
        return Inertia::render('Mahasiswa/IRS', [
            'mahasiswa' => $mahasiswa
        ]);
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