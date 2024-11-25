<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use App\Models\Mahasiswa;
use Inertia\Inertia;
use App\Models\Ruang;

class AdminController extends Controller
{

    public function index()
    {
       return Inertia::render('Admin/Dashboard');
    }

    public function Alokasi(){
        $ruang = Ruang::with('fakultas')->orderBy('id', 'asc')->paginate(5);
        return Inertia::render('Admin/AlokasiRuang', [
            'ruang' => $ruang
        ]);
    }

    public function creteRuang(){
        $fakultas = Fakultas::all();
        return Inertia::render('Admin/TambahRuang', [
            'fakultas' => $fakultas
        ]);
    }

    public function storeRuang(Request $request){
        $request->validate([
            'kode_ruang' => 'required|string|unique:ruangs,kode_ruang',
            'kapasitas' => 'required|integer',
            'kode_fakultas' => 'required|string|exists:fakultas,kode_fakultas',
        ]);

        $ruang = new Ruang;
        $ruang->kode_ruang = $request->kode_ruang;
        $ruang->kapasitas = $request->kapasitas;
        $ruang->kode_fakultas = $request->kode_fakultas;
        $ruang->save();

        return redirect()->route('admin.alokasi')->with('success', 'Ruang berhasil ditambahkan.');
    }

    public function editRuang($id)
    {
        $ruang = Ruang::findOrFail($id);
        $fakultas = Fakultas::all(); // Ambil data fakultas
        return Inertia::render('Admin/EditRuang', [
            'ruang' => $ruang,
            'fakultas' => $fakultas,
        ]);
    }

    public function updateRuang(Request $request, $id)
    {
        $request->validate([
            'kode_ruang' => 'required|string|unique:ruangs,kode_ruang,' . $id,
            'kapasitas' => 'required|integer',
            'kode_fakultas' => 'required|string|exists:fakultas,kode_fakultas',
        ]);

        $ruang = Ruang::findOrFail($id);
        $ruang->kode_ruang = $request->kode_ruang;
        $ruang->kapasitas = $request->kapasitas;
        $ruang->kode_fakultas = $request->kode_fakultas;
        $ruang->save();

        return redirect()->route('admin.alokasiruang')->with('success', 'Ruang berhasil diperbarui.');
    }

    public function destroyRuang($id)
    {
        $ruang = Ruang::findOrFail($id);
        $ruang->delete();

        return redirect()->route('admin.alokasiruang')->with('success', 'Ruang berhasil dihapus.');
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