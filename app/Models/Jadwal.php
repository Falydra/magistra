<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jadwal extends Model
{
    use HasFactory;

    protected $table = 'jadwal';

    protected $fillable = [
        'ruang_id',
        'kelas_id',
        'hari',
        'waktu_mulai_id',
        'waktu_akhir',
        'matkul_id',
    ];

    // Relasi ke tabel Ruang
    public function ruang()
    {
        return $this->belongsTo(Ruang::class, 'ruang_id');
    }

    // Relasi ke tabel Kelas
    public function kelas()
    {
        return $this->belongsTo(Kelas::class, 'kelas_id');
    }

    // Relasi ke tabel Waktu
    public function waktuMulai()
    {
        return $this->belongsTo(Waktu::class, 'waktu_mulai_id');
    }

    // Relasi ke tabel Mata Kuliah
    public function mataKuliah()
    {
        return $this->belongsTo(MataKuliah::class, 'matkul_id');
    }
}