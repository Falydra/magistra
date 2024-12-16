<?php

    namespace App\Http\Controllers\Mahasiswa;

    use App\Http\Controllers\Controller;
    use Illuminate\Http\Request;
    use App\Http\Requests\IRSRequest;
    use App\Http\Requests\IRSJadwalRequest;
    use App\Models\Mahasiswa;
    use Inertia\Inertia;
    use App\Models\Kelas;
    use App\Models\Jadwal;
    use App\Models\IRS;
    use App\Models\Hari;
    use App\Models\Ruang;
    use App\Models\MataKuliah;
    use App\Models\IRSJadwal;
    use Carbon\Carbon;



    class IRSController extends Controller
    {
        public function index()
    {
        $user = auth()->user();
        $mahasiswa = $user->mahasiswa;  

        


            
            $irs = IRS::join('mahasiswa', 'irs.nim', '=', 'mahasiswa.nim')
                ->select('irs.*', 'mahasiswa.nama', 'mahasiswa.tahun_masuk', 'mahasiswa.kode_registrasi')
                ->where('irs.nim', $mahasiswa->nim)
                ->get();

        
            return Inertia::render('Mahasiswa/IRS', [
                'mahasiswa' => $mahasiswa,
            
                'irs' => $irs,
            
            ]);
    }

    public function create(Request $request){
        $user = auth()->user();
        $mahasiswa = $user->mahasiswa;

        // if ($mahasiswa->hasMadeIRS) {
        //     return redirect()->back()->with('error', 'IRS hanya dapat dibuat sekali.');
        // }   

        $irs = IRS::join('mahasiswa', 'irs.nim', '=', 'mahasiswa.nim')
            ->select('irs.total_sks', 'irs.status')
            ->where('irs.nim', $mahasiswa->nim)
            ->orderBy('irs.semester', 'desc')
            ->get();

            

    

        $matakuliah = MataKuliah::all();
        
    
        $hari = Hari::all();
        $ruang = Ruang::all();

        $jadwalQuery = Jadwal::join('mata_kuliah', 'jadwal.kode_mk', '=', 'mata_kuliah.kode_mk')
            ->leftJoin('dosen as d1', 'mata_kuliah.dosen_nip', '=', 'd1.nip')
            ->leftJoin('dosen as d2', 'mata_kuliah.dosen_nip_2', '=', 'd2.nip')
            ->leftJoin('dosen as d3', 'mata_kuliah.dosen_nip_3', '=', 'd3.nip')
            ->select(
                'jadwal.*',
                'mata_kuliah.nama as nama',
                'mata_kuliah.sks',
                'mata_kuliah.semester',
                'mata_kuliah.kuota',
                'd1.nama as dosen_1',
                'd2.nama as dosen_2',
                'd3.nama as dosen_3'
            );
        


        if ($request->has('filterSemester') && $request->filterSemester) {
            $jadwalQuery->where('mata_kuliah.semester', $request->filterSemester);
        }

        if ($request->has('filterSKS') && $request->filterSKS) {
            $jadwalQuery->where('mata_kuliah.sks', $request->filterSKS);
        }


        if ($request->has('filterJenis') && $request->filterJenis) {
            $jadwalQuery->where('mata_kuliah.jenis', $request->filterJenis);
        }

        
        $jadwal = $jadwalQuery->get();
        $kelas = Kelas::whereIn('kelas', $jadwal->pluck('kelas')->toArray())->get();


        return Inertia::render('Mahasiswa/TambahIRS', [
            'mahasiswa' => $mahasiswa,
            // load('irs')->toArray() + [
        // 'hasMadeIRS' => $mahasiswa->hasMadeIRS,
            
            'kelas' => $kelas,
            'jadwal' => $jadwal,
            'hari' => $hari,
            'ruang' => $ruang,
            'irs' => $irs,
            'matakuliah' => $matakuliah,
            'session' => [
                'selected_ids' => session('selected_ids', []),
                'total_sks' => session('total_sks', 0),
            ],

            'filters' => $request->only(['filterSKS', 'filterSemester', 'filterJenis']),	
        ]);
        }

        public function store(IRSRequest $request, IRSJadwalRequest $request2)
    {
        $user = auth()->user();
        $mahasiswa = $user->mahasiswa;
        $validated = $request->validated();
        $validated2 = $request2->validated();

        // Cek apakah mahasiswa sudah membuat IRS pada semester ini
        $existingIRS = IRS::where('nim', $mahasiswa->nim)
            ->where('semester', $mahasiswa->semester)
            ->first();

        if ($existingIRS) {
            return redirect()->route('mahasiswa.checkIRS')->withErrors([
                'error' => 'IRS untuk semester ini sudah dibuat. Silakan edit mata kuliah Anda.',
            ]);
        }

        // Buat IRS baru
        $irs = IRS::create([
            'nim' => $mahasiswa->nim,
            'total_sks' => $validated['total_sks'],
            'semester' => $mahasiswa->semester,
            'status' => 'Belum Disetujui',
        ]);

        foreach ($validated2['id_jadwal'] as $value) {
            IRSJadwal::create([
                'id_irs' => $irs->id,
                'id_jadwal' => $value,
            ]);
        }

        // Simpan data ke session
        session([
            'selected_ids' => $validated2['id_jadwal'],
            'total_sks' => $validated['total_sks'],
        ]);

        return redirect()->route('mahasiswa.checkIRS')->with('success', 'IRS berhasil dibuat.');
    }

    public function updateIRS(Request $request)
    {
        $user = auth()->user();
        $mahasiswa = $user->mahasiswa;

        $irs = IRS::where('nim', $mahasiswa->nim)
            ->where('semester', $mahasiswa->semester)
            ->firstOrFail();

        $validatedData = $request->validate([
            'id_jadwal' => 'required|array',
            'id_jadwal.*' => 'exists:jadwal,id',
            'total_sks' => 'required|integer|max:' . ($mahasiswa->ips > 3.00 ? 24 : 21),
        ]);

        // Update IRS dan jadwal
        $irs->update(['total_sks' => $validatedData['total_sks']]);
        IRSJadwal::where('id_irs', $irs->id)->delete();

        foreach ($validatedData['id_jadwal'] as $jadwalId) {
            IRSJadwal::create([
                'id_irs' => $irs->id,
                'id_jadwal' => $jadwalId,
            ]);
        }

        // Update session
        session([
            'selected_ids' => $validatedData['id_jadwal'],
            'total_sks' => $validatedData['total_sks'],
        ]);

        return redirect()->route('mahasiswa.checkIRS')->with('success', 'IRS berhasil diperbarui.');
    }



    public function checkIRS(Request $request)
    {
        $user = auth()->user();
        $mahasiswa = $user->mahasiswa;
    
        $semester = $request->get('semester', null); // Ambil parameter semester jika ada, default null
    
        $irs = IRS::join('mahasiswa', 'irs.nim', '=', 'mahasiswa.nim')
            ->select('irs.id', 'irs.total_sks', 'irs.status', 'irs.semester')
            ->where('irs.nim', $mahasiswa->nim)
            ->when($semester, function ($query, $semester) {
                return $query->where('irs.semester', $semester); // Filter berdasarkan semester jika tersedia
            })
            ->orderBy('irs.semester', 'desc')
            ->get();
    
        $mahasiswa = Mahasiswa::join('prodi', 'mahasiswa.kode_prodi', '=', 'prodi.kode_prodi')
            ->leftJoin('pembimbing as p1', 'mahasiswa.pembimbing_id', '=', 'p1.id')
            ->leftJoin('dosen as d1', 'p1.nip', '=', 'd1.nip')
            ->join('irs', 'mahasiswa.nim', '=', 'irs.nim')
            ->select(
                'mahasiswa.*',
                'irs.status as status_irs',
                'irs.total_sks as total_sks',
                'prodi.nama as prodi',
                'd1.nama as dosen_pembimbing',
            )
            ->where('mahasiswa.nim', $mahasiswa->nim)
            ->when($semester, function ($query, $semester) {
                return $query->where('irs.semester', $semester); // Filter berdasarkan semester jika tersedia
            })
            ->orderBy('irs.semester', 'desc')
            ->first();
    
        $irsJadwal = IRSJadwal::join('irs', 'irs_jadwal.id_irs', '=', 'irs.id')
            ->join('jadwal', 'irs_jadwal.id_jadwal', '=', 'jadwal.id')
            ->join('mata_kuliah', 'jadwal.kode_mk', '=', 'mata_kuliah.kode_mk')
            ->leftJoin('dosen as d1', 'mata_kuliah.dosen_nip', '=', 'd1.nip')
            ->leftJoin('dosen as d2', 'mata_kuliah.dosen_nip_2', '=', 'd2.nip')
            ->leftJoin('dosen as d3', 'mata_kuliah.dosen_nip_3', '=', 'd3.nip')
            ->select(
                'irs.total_sks as Total sks',
                'irs.semester as semester',
                'jadwal.*',
                'mata_kuliah.nama as nama',
                'mata_kuliah.semester as semester',
                'mata_kuliah.sks',
                'd1.nama as dosen_1',
                'd2.nama as dosen_2',
                'd3.nama as dosen_3'
            )
            ->where('irs.nim', $mahasiswa->nim)
            ->when($semester, function ($query, $semester) {
                return $query->where('irs.semester', $semester); // Filter berdasarkan semester jika tersedia
            })
            ->get();
    
        return Inertia::render('Mahasiswa/CheckIRS', [
            'mahasiswa' => $mahasiswa,
            'irsJadwal' => $irsJadwal,
            'irs' => $irs,
        ]);
    }
    

        public function ajukanIRS(Request $request)
    {
        try {
            // Validasi input
            $validated = $request->validate([
                'mahasiswa_nim' => 'required|string|exists:mahasiswa,nim', // NIM harus ada di tabel mahasiswa
                'irs_id' => 'required|integer|exists:irs,id',            // IRS ID harus valid
                'jadwal_ids' => 'required|array',                       // Harus ada array jadwal IDs
                'jadwal_ids.*' => 'integer|exists:irs_jadwal,id',       // Setiap jadwal ID harus valid di tabel pivot irs_jadwal
            ]);

            \Log::info('Data berhasil divalidasi:', $validated);

            // Dapatkan data mahasiswa dan IRS terkait
            $mahasiswa = Mahasiswa::where('nim', $validated['mahasiswa_nim'])->first();
            $irs = IRS::findOrFail($validated['irs_id']);

            // Periksa apakah IRS terkait dengan mahasiswa
            if ($irs->nim !== $mahasiswa->nim) {
                return response()->json([
                    'success' => false,
                    'message' => 'IRS tidak sesuai dengan NIM mahasiswa.',
                ], 422);
            }

            // Perbarui status IRS
            $irs->update([
                'status' => 'diajukan', // Status pengajuan
            ]);

            // Simpan jadwal terkait IRS di tabel pivot jika perlu (opsional)
            foreach ($validated['jadwal_ids'] as $jadwalId) {
                $pivot = IRSJadwal::where('irs_id', $irs->id)
                    ->where('id', $jadwalId)
                    ->first();

                if ($pivot) {
                    $pivot->update([
                        'status' => 'diajukan', // Update status di tabel pivot
                    ]);
                }
            }

            return response()->json([
                'success' => true,
                'message' => 'IRS berhasil diajukan ke pembimbing.',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Tangkap validasi error
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            // Tangkap error umum lainnya
            \Log::error('Error saat mengajukan IRS:', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat mengajukan IRS.',
            ], 500);
        }
        }

        public function destroy(Request $request, $id)
        {

            
                                            
            $irs = IRS::findOrFail($id);
            $user = auth()->user();
            $mahasiswa = $user->mahasiswa;
            // with this logic
            // IRS with the semester < mahasiswa semester, the trash icon will be disabled
            if ($irs->semester < $mahasiswa->semester) {
                return redirect()->route('mahasiswa.deleteIRS');
            }


            $irs->delete();

            return redirect()->route('mahasiswa.irs');
        }
    }
