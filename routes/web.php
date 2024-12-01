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


Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
Route::get('/admin/alokasiruang', [AdminController::class, 'Alokasi'])->name('admin.alokasiruang');
Route::get('/admin/tambahruang', [AdminController::class, 'creteRuang'])->name('admin.tambahruang');
Route::post('/admin/tambahruang', [AdminController::class, 'storeRuang'])->name('admin.storeruang');
Route::patch('/admin/updateruang', [AdminController::class, 'updateRuang'])->name('admin.updateruang');
Route::delete('/admin/deleteruang', [AdminController::class, 'deleteAllruang'])->name('admin.deleteAllruang');
Route::get('/admin/testpage', [AdminController::class, 'Test'])->name('admin.test');

Route::get('/mahasiswa/dashboard', [MahasiswaController::class, 'index'])->name('mahasiswa.dashboard');
Route::get('/mahasiswa/registrasi', [MahasiswaController::class, 'registrasi'])->name('mahasiswa.registrasi');
Route::get('/mahasiswa/pembayaran', [MahasiswaController::class, 'pembayaran'])->name('mahasiswa.pembayaran');
Route::get('/mahasiswa/irs', [MahasiswaController::class, 'irs'])->name('mahasiswa.irs');
Route::get('/mahasiswa/khs', [MahasiswaController::class, 'khs'])->name('mahasiswa.khs');


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
