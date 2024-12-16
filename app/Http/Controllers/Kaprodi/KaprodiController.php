<?php

namespace App\Http\Controllers\Kaprodi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Kaprodi;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Prodi;
use Illuminate\Support\Facades\Auth;
use App\Models\Ruang;

class KaprodiController extends Controller {
    
        public function create() {
            return view('kaprodi.create');
        }

        public function monitoring(){
            return Inertia::render('Kaprodi/MonitoringIRS');
        }
        
        public function buatJadwal(){
            return Inertia::render('Kaprodi/BuatJadwal');
        }
        public function aturMK(){
            return Inertia::render('Kaprodi/AturMatkul');
        }
        public function tambahMK(){
            return Inertia::render('Kaprodi/TambahMatkul');
        }

        public function ringkasanJadwal(){
            return Inertia::render(('Kaprodi/RingkasanJadwal'));
        }

        public function index(Request $request) {
            return Inertia::render('Kaprodi/DashboardKaprodi', [
                'auth' => ['user' => $request->user(),
                ],
                'kaprodi' => $request->user()->kaprodi,
            ]);
        }

        public function getProdi()
        {
            try {
                $prodi = Prodi::select(['id', 'kode_prodi', 'nama'])->get();

                return response()->json([
                    'success' => true,
                    'data' => $prodi,
                ]);
            } catch (\Exception $e) {
                \Log::error('Error fetching prodi:', ['error' => $e->getMessage()]);

                return response()->json([
                    'success' => false,
                    'message' => 'Gagal mengambil data prodi.',
                ], 500);
            }
        }

        public function getRuangByProdi()
        {
            $user = Auth::user();
            if ($user->role !== 'kaprodi') {
                return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
            }

            $kaprodi = Kaprodi::where('user_id', $user->id)->first();
            if (!$kaprodi) {
                return response()->json(['success' => false, 'message' => 'Prodi tidak ditemukan untuk kaprodi ini.'], 404);
            }

            $ruang = Ruang::where('kode_prodi', $kaprodi->kode_prodi)
            ->where('is_verif', '2') 
            ->get();
                return response()->json(['success' => true, 'data' => $ruang]);
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