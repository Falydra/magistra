<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\RuangController;
use App\Http\Controllers\Mahasiswa\MahasiswaController;
use App\Http\Controllers\Mahasiswa\SubmitIRSController;
use App\Http\Controllers\Mahasiswa\IRSController;
use App\Http\Controllers\Pembimbing\PembimbingController;
use App\Http\Controllers\Dekan\DekanController;
use App\Http\Controllers\Dekan\JadwalApprovalController;
use App\Http\Controllers\Kaprodi\KaprodiController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MataKuliahController;
use App\Http\Controllers\JadwalController;
use App\Http\Controllers\JadwalProdiController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DetailMahasiswaController;
use App\Http\Controllers\WaktuController;
use App\Http\Controllers\KelasController;
use App\Http\Controllers\DosenController;
use App\Http\Controllers\IRSControllerPembimbing;




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
Route::patch('/admin/alokasiruang', [RuangController::class, 'updateStatus'])->name('admin.updatestatus');
Route::patch('/admin/resetstatus', [RuangController::class, 'resetStatus'])->name('admin.resetstatus');
Route::get('/admin/testpage', [AdminController::class, 'Test'])->name('admin.test');

Route::get('/mahasiswa/dashboard', [MahasiswaController::class, 'index'])->name('mahasiswa.dashboard');
Route::get('/mahasiswa/registrasi', [MahasiswaController::class, 'registrasi'])->name('mahasiswa.registrasi');
Route::patch('/mahasiswa/updateStatus', [MahasiswaController::class, 'updateStatus'])->name('mahasiswa.updatestatus');

// Route::patch('/mahasiswa/updateStatusBayar', [MahasiswaController::class, 'updateStatusBayar'])->name('mahasiswa.updatestatusbayar');

Route::get('/mahasiswa/pembayaran', [MahasiswaController::class, 'pembayaran'])->name('mahasiswa.pembayaran');
Route::get('/mahasiswa/irs-mahasiswa', [IRSController::class, 'index'])->name('mahasiswa.irs');
Route::get('/mahasiswa/tambahirs', [IRSController::class, 'create'])->name('mahasiswa.tambahirs');

Route::get('mahasiswa/check-irs', [IRSController::class, 'checkIRS'])->name('mahasiswa.checkIRS');
Route::post('/mahasiswa/irs', [IRSController::class, 'store'])->name('mahasiswa.storeirs');
Route::post('/mahasiswa/ajukan-irs', [SubmitIRSController::class, 'submitIRS'])->name('mahasiswa.submitIRS');
Route::post('/mahasiswa/irs/{id}', [IRSController::class, 'updateIRS'])->name('mahasiswa.updateIRS');

Route::delete('/mahasiswa/irs/{id}', [IRSController::class, 'destroy'])->name('mahasiswa.deleteIRS');
Route::get('/mahasiswa/khs', [MahasiswaController::class, 'khs'])->name('mahasiswa.khs');

Route::middleware(['auth'])->group(function () {
    Route::get('/pembimbing/dashboard', [PembimbingController::class, 'index'])->name('pembimbing.dashboard');
    Route::get('/pembimbing/persetujuanIRS', [PembimbingController::class, 'persetujuanIRS'])->name('pembimbing.persetujuanIRS');
    Route::get('/pembimbing/detailMahasiswa/{id}', [PembimbingController::class, 'detailMahasiswa'])->name('pembimbing.detailMahasiswa');
    Route::get('/pembimbing/khsMahasiswa', [PembimbingController::class, 'khsMahasiswa'])->name('pembimbing.khsMahasiswa');
    Route::post('/approve-irs', [IRSControllerPembimbing::class, 'approve'])->name('approve.irs');
    Route::post('/cancel-irs', [IRSControllerPembimbing::class, 'cancel'])->name('cancel-irs');
    // Route::patch('/pembimbing/persetujuanIRS', [IRSControllerPembimbing::class, 'allowChange'])->name('allowChange');
    Route::post('/approve-2/{id}', [DetailMahasiswaController::class, 'approveIRS'])->name('irs.approve');
    Route::post('/cancel-irs2/{id}', [DetailMahasiswaController::class, 'cancelIRS'])->name('irs.cancel');
    Route::post('/allow-edit-irs2/{id}', [DetailMahasiswaController::class, 'allowEditIRS'])->name('irs.allowEdit');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});


Route::get('/kaprodi/dashboard', [KaprodiController::class, 'index'])->name('kaprodi.dashboard');
Route::get('/kaprodi/monitoring', [KaprodiController::class, 'monitoring'])->name('kaprodi.monitoringIRS');
Route::get('kaprodi/penyusunan-jadwal/buat-jadwal', [KaprodiController::class, 'buatJadwal'])->name('kaprodi.buatJadwal');
Route::get('/kaprodi/penyusunan-jadwal/atur-matkul', [KaprodiController::class, 'aturMK'])->name('kaprodi.aturMK');
Route::get('/kaprodi/penyusunan-jadwal/ringkasan-jadwal', [KaprodiController::class, 'ringkasanJadwal'])->name('kaprodi.ringkasanJadwal');
Route::get('/kaprodi/penyusunan-jadwal/atur-matkul/tambah-matkul', [KaprodiController::class, 'tambahMK'])->name('kaprodi.tambahMK');
Route::get('/kaprodi/penyusunan-jadwal/edit-jadwal', [JadwalController::class, 'edit'])->name('editJadwal');

Route::get('/jadwal', [JadwalController::class, 'index'])->name('showJadwal');
Route::get('/mata-kuliah', [MataKuliahController::class, 'getMataKuliah'])->name('getMatkul'); // Fetch daftar mata kuliah
Route::get('/dosen', [DosenController::class, 'getDosen'])->name('getDosen');
Route::get('/kelas', [KelasController::class, 'getKelas'])->name('getKelas');
Route::get('/ruang', [RuangController::class, 'getRuang'])->name('getRuang');
Route::get('/waktu', [WaktuController:: class,'getWaktu'])->name('getWaktu');
Route::get('/daftar-prodi', [KaprodiController::class, 'getProdi'])->name('getProdi');
Route::get('/ruang/prodi', [KaprodiController::class, 'getRuangByProdi']);

Route::post('/mata-kuliah/update', [MataKuliahController::class, 'updateMataKuliah'])->name('updateMatkul'); // Kelola matkul
Route::get('/mata-kuliah/{kode_mk}', [MataKuliahController::class, 'getMataKuliahDetail'])->name('mataKuliahDetail'); // Fetch detail matkul tertentu
Route::post('/tambah-matkul', [MataKuliahController::class, 'tambahMatkul'])->name('tambahMatkul');

Route::get('/get-jadwal', [JadwalController::class, 'getJadwal'])->name('getJadwal');
Route::post('/cek-jadwal-new', [JadwalController::class, 'checkAvailability'])->name('cekJadwalNew');
Route::post('/cek-jadwal-edit', [JadwalController::class, 'checkAvailability'])->name('cekJadwalEdit');
Route::post('/buat-jadwal', [JadwalController::class, 'store'])->name('buatJadwal');
Route::post('/update-jadwal', [JadwalController::class, 'update'])->name('jadwal.update');
Route::delete('/jadwal/{id}', [JadwalController::class, 'destroy'])->name('jadwal.destroy');

Route::post('/ajukan-ke-dekan', [JadwalProdiController::class, 'ajukanKeDekan'])->name('ajukanDekan');

Route::get('/dekan/dashboard', [DekanController::class, 'index'])->name('dekan.dashboard');
Route::get('/dekan/persetujuanruang', [DekanController::class, 'showruang'])->name('dekan.ruang');
Route::get('/dekan/persetujuanjadwal', [DekanController::class, 'showJadwal'])->name('dekan.jadwal');
Route::patch('/dekan/updateStatus', [DekanController::class, 'updateStatus'])->name('dekan.updatestatus');
Route::patch('/dekan/rejectStatus', [DekanController::class, 'rejectStatus'])->name('dekan.rejectstatus');
Route::patch('/dekan/resetstatus', [DekanController::class, 'resetStatus'])->name('dekan.resetstatus');
Route::post('/dekan/approve', [JadwalApprovalController::class, 'approveJadwal'])->name('dekan.approve');



Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('login.store');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
