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