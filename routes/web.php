<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Mahasiswa\MahasiswaController;
use App\Http\Controllers\Pembimbing\PembimbingController;
use App\Http\Controllers\Kaprodi\KaprodiController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ProfileController;

use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('welcome');

// Define the regular dashboard route
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/admin/dashboard', function () {
    return Inertia::render('Admin/Dashboard');
})->middleware(['auth', 'admin'])->name('admin.dashboard');


Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
Route::get('/mahasiswa/dashboard', [MahasiswaController::class, 'index'])->name('mahasiswa.dashboard');

Route::get('/pembimbing/dashboard', [PembimbingController::class, 'index'])->name('pembimbing.dashboard');
Route::get('/pembimbing/persetujuanIRS', [PembimbingController::class, 'persetujuanIRS'])->name('pembimbing.persetujuanIRS');
Route::get('/pembimbing/detailMahasiswa', [PembimbingController::class, 'detailMahasiswa'])->name('pembimbing.detailMahasiswa');
Route::get('/pembimbing/khsMahasiswa', [PembimbingController::class, 'khsMahasiswa'])->name('pembimbing.khsMahasiswa');

Route::get('/kaprodi/dashboard', [KaprodiController::class, 'index'])->name('kaprodi.dashboard');
Route::get('/kaprodi/monitoring', [KaprodiController::class, 'monitoring'])->name('kaprodi.monitoringIRS');




Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('login.store');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
