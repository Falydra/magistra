<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\RuangRequest;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use App\Models\Mahasiswa;
use App\Models\Akademik;
use Inertia\Inertia;
use App\Models\Ruang;

class AdminController extends Controller
{

    public function index()
    {
        $akademik = Akademik::orderBy('id', 'asc')->first();
       return Inertia::render('Admin/Dashboard', [
           'akademik' => $akademik
       ]);
    }

    public function Alokasi(Request $request){

        $query = Ruang::query();

        if ($request->has('filter_gedung') && $request->filter_gedung) {
            $query->where('kode_gedung', $request->filter_gedung);
        }
        if ($request->has('filter_prodi') && $request->filter_prodi) {
            $query->where('kode_prodi', $request->filter_prodi);
        }

        $ruang = $query->orderBy('id', 'asc')->paginate(5)->appends($request->only(['filter_gedung', 'filter_prodi']));
        return Inertia::render('Admin/AlokasiRuang', [
            'ruang' => $ruang,
            'filters' => $request->only(['filter_gedung', 'filter_prodi']),
        ]);
    }

    public function creteRuang(Request $request){
        $query = Ruang::query();

        if ($request->has('filter_gedung') && $request->filter_gedung) {
            $query->where('kode_gedung', $request->filter_gedung);
        }

        if ($request->has('filter_prodi') && $request->filter_prodi) {
            $query->where('kode_prodi', $request->filter_prodi);
        }

       

        $ruang = $query->get();

        return Inertia::render('Admin/TambahRuang', [
            'ruang' => $ruang,
            'filters' => $request->only(['filter_gedung', 'filter_prodi']),
        ]);
    }

    public function storeRuang(RuangRequest $request){
        $validated = $request->validated();

        $existingGedung = Ruang::where('kode_gedung', $validated['kode_gedung'])
            ->where('kode_prodi', '!=', $validated['kode_prodi'])
            ->first();
            
        $existingProdi = Ruang::where('kode_prodi', $validated['kode_prodi'])
            ->where('kode_gedung', '!=', $validated['kode_gedung'])
            ->first();

        if ($existingGedung) {
            return back()->withErrors(['kode_gedung' => 'Gedung ini sudah ditempati oleh prodi lain.'])->withInput();
        }

        if ($existingProdi) {
            return back()->withErrors(['kode_prodi' => 'Prodi ini sudah ditempati di gedung lain.'])->withInput();
        }

        if (strtoupper($validated['kode_ruang'][0]) !== strtoupper($validated['kode_gedung'][0])) {
            return back()->withErrors(['kode_ruang' => 'Kode ruang harus dimulai dengan huruf yang sama dengan kode gedung.'])->withInput();
        }

        $validated['kode_fakultas'] = '24';

        Ruang::create($validated);

        return redirect()->route('admin.alokasiruang')->with('success', 'Ruang berhasil ditambahkan.');
    }

    public function editRuang($id)
    {
        $ruang = Ruang::findOrFail($id);

        return Inertia::render('Admin/AlokasiRuang', [
            'ruang' => $ruang,
        ]);
    }
    public function updateRuang(Request $request, $id)
    {
        $validated = $request->validate([
            'kode_ruang' => 'required|string|max:255',
            'kode_gedung' => 'required|string|max:255',
            'kode_prodi' => 'required|string|max:255',
            'kode_fakultas' => 'required|string|max:255',
            'kapasitas' => 'required|integer|min:1',
        ]);

        $ruang = Ruang::findOrFail($id);
        $ruang->update($validated);

        return redirect()->route('admin.tambahruang')->with('success', 'Ruang berhasil diperbarui.');
    }

    public function destroy($id) {
        Ruang::find($id)->delete();
        return redirect()->route('admin.alokasiruang')->with('success', 'Ruang berhasil dihapus.');

    }
    

    public function deleteAllruang()
    {
        Ruang::query()->delete();

        return redirect()->route('admin.alokasiruang')->with('success', 'Semua ruang berhasil dihapus.');
    }

    public function Test(){
        return Inertia::render('Admin/TestPage');
    }
    public function show($id)
    {
        $user = User::find($id);
        return Inertia::render('Admin/Show', [
            'user' => $user
        ]);
    }




    public function create()
    {
        return view('admin.create');
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

        return redirect()->route('admin.dashboard')->with('success', 'User created successfully.');
    }
}