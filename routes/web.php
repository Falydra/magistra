<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Mahasiswa\MahasiswaController;
use App\Http\Controllers\Pembimbing\PembimbingController;
use App\Http\Controllers\Dekan\DekanController;
use App\Http\Controllers\Kaprodi\KaprodiController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Mahasiswa\IRSController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MataKuliahController;
use App\Http\Controllers\JadwalController;
use App\Http\Controllers\JadwalProdiController;


use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('welcome');

// Define the regular dashboard route


Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
Route::get('/admin/alokasiruang', [AdminController::class, 'Alokasi'])->name('admin.alokasiruang');
Route::get('/admin/tambahruang', [AdminController::class, 'creteRuang'])->name('admin.tambahruang');
Route::post('/admin/tambahruang', [AdminController::class, 'storeRuang'])->name('admin.storeruang');
Route::delete('/admin/alokasiruang/{id}', [AdminController::class, 'destroy'])->name('admin.deleteruang');
Route::patch('/admin/updateruang', [AdminController::class, 'updateRuang'])->name('admin.updateruang');


Route::delete('/admin/deleteruang', [AdminController::class, 'deleteAllruang'])->name('admin.deleteAllruang');
Route::get('/admin/testpage', [AdminController::class, 'Test'])->name('admin.test');

Route::get('/mahasiswa/dashboard', [MahasiswaController::class, 'index'])->name('mahasiswa.dashboard');
Route::get('/mahasiswa/registrasi', [MahasiswaController::class, 'registrasi'])->name('mahasiswa.registrasi');
Route::patch('/mahasiswa/updateStatus', [MahasiswaController::class, 'updateStatus'])->name('mahasiswa.updatestatus');

// Route::patch('/mahasiswa/updateStatusBayar', [MahasiswaController::class, 'updateStatusBayar'])->name('mahasiswa.updatestatusbayar');

Route::get('/mahasiswa/pembayaran', [MahasiswaController::class, 'pembayaran'])->name('mahasiswa.pembayaran');
Route::get('/mahasiswa/irs', [IRSController::class, 'index'])->name('mahasiswa.irs');
Route::get('/mahasiswa/tambahirs', [IRSController::class, 'create'])->name('mahasiswa.tambahirs');
Route::get('mahasiswa/check-irs', [IRSController::class, 'checkIRS'])->name('mahasiswa.checkIRS');
Route::post('/mahasiswa/check-irs', [IRSController::class, 'store'])->name('mahasiswa.storeirs');
Route::post('/submit-irs', [IRSController::class, 'submitIRS'])->name('mahasiswa.submitIRS');
Route::get('/mahasiswa/khs', [MahasiswaController::class, 'khs'])->name('mahasiswa.khs');


Route::get('/pembimbing/dashboard', [PembimbingController::class, 'index'])->name('pembimbing.dashboard');
Route::get('/pembimbing/persetujuanIRS', [PembimbingController::class, 'persetujuanIRS'])->name('pembimbing.persetujuanIRS');
Route::get('/pembimbing/detailMahasiswa', [PembimbingController::class, 'detailMahasiswa'])->name('pembimbing.detailMahasiswa');
Route::get('/pembimbing/khsMahasiswa', [PembimbingController::class, 'khsMahasiswa'])->name('pembimbing.khsMahasiswa');

Route::get('/kaprodi/dashboard', [KaprodiController::class, 'index'])->name('kaprodi.dashboard');
Route::get('/kaprodi/monitoring', [KaprodiController::class, 'monitoring'])->name('kaprodi.monitoringIRS');
Route::get('kaprodi/penyusunan-jadwal/buat-jadwal', [KaprodiController::class, 'buatJadwal'])->name('kaprodi.buatJadwal');
Route::get('/kaprodi/penyusunan-jadwal/atur-matkul', [KaprodiController::class, 'aturMK'])->name('kaprodi.aturMK');
Route::get('/kaprodi/penyusunan-jadwal/ringkasan-jadwal', [KaprodiController::class, 'ringkasanJadwal'])->name('kaprodi.ringkasanJadwal');
Route::get('/kaprodi/penyusunan-jadwal/atur-matkul/tambah-matkul', [KaprodiController::class, 'tambahMK'])->name('kaprodi.tambahMK');
Route::get('/kaprodi/penyusunan-jadwal/edit-jadwal', [JadwalController::class, 'edit'])->name('editJadwal');
Route::post('/mata-kuliah/update', [MataKuliahController::class, 'updateMataKuliah'])->name('updateMatkul'); // Kelola matkul
Route::get('/mata-kuliah/{kode_mk}', [MataKuliahController::class, 'getMataKuliahDetail'])->name('mataKuliahDetail'); // Fetch detail matkul tertentu
Route::get('/get-jadwal', [JadwalController::class, 'getJadwal'])->name('getJadwal');
Route::post('/cek-jadwal', [JadwalController::class, 'checkAvailability'])->name('cekJadwal');
Route::post('/buat-jadwal', [JadwalController::class, 'store'])->name('buatJadwal');
Route::post('/update-jadwal', [JadwalController::class, 'update'])->name('jadwal.update');
Route::delete('/jadwal/{id}', [JadwalController::class, 'destroy'])->name('jadwal.destroy');
Route::post('/ajukan-ke-dekan', [JadwalProdiController::class, 'ajukanKeDekan'])->name('ajukanDekan');

Route::get('/dekan/dashboard', [DekanController::class, 'index'])->name('dekan.dashboard');



Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('login.store');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
