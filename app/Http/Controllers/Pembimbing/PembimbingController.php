<?php

namespace App\Http\Controllers\Pembimbing;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pembimbing;
use App\Models\Mahasiswa;
use App\Models\IRS;
use App\Models\Jadwal;
use App\Models\IRSJadwal;
use App\Models\AngkatanPerwalian;
use Inertia\Inertia;

class PembimbingController extends Controller {
    
        public function index() {
            return Inertia::render('Pembimbing/Dashboard');
        }

        public function persetujuanIRS()
        {
            $pembimbing = Auth::user()->pembimbing;
            $angkatanPerwalian = $pembimbing->angkatanPerwalian()->pluck('angkatan_perwalian');
            
            // Mengambil mahasiswa berdasarkan angkatan yang diinginkan dan memastikan mahasiswa sudah terdaftar di IRS
            $students = Mahasiswa::whereIn('tahun_masuk', $angkatanPerwalian)
                ->whereHas('pembimbing', function ($query) use ($pembimbing) {
                    $query->where('id', $pembimbing->id);
                })
                ->whereHas('irs') // Pastikan mahasiswa sudah terdaftar di IRS
                ->with(['irs.jadwal.mataKuliah' => function ($query) {
                    $query->select('id', 'sks'); // Mengambil id dan sks dari mataKuliah yang terkait dengan jadwal
                }])
                ->paginate(10);

            return Inertia::render('Pembimbing/PersetujuanIRS', [
                'students' => $students,
                'angkatanPerwalian' => $angkatanPerwalian,
            ]);
        }
        
        public function detailMahasiswa($id)
        {
            $student = Mahasiswa::with(['irs.jadwal.mataKuliah'])
            ->findOrFail($id);

            // Jika mahasiswa tidak ditemukan
            if (!$student) {
                return redirect()->route('pembimbing.persetujuanIRS')->with('error', 'Student not found');
            }

            return inertia('Pembimbing/DetailMahasiswa', [
                'student' => $student,
            ]);
        }

        

        public function khsMahasiswa(){
            return Inertia::render('Pembimbing/KHS');
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