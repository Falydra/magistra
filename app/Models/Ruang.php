<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ruang extends Model
{
    use HasFactory;
    protected $table = 'ruang';
    protected $fillable = [
        'gedung',
        'kode_ruang',
        'kapasitas',
        'kode_fakultas',
    ];

    /**
     * Relasi ke model Fakultas (Many-to-One).
     */
    public function fakultas()
    {
        return $this->belongsTo(Fakultas::class, 'kode_fakultas');
    }
    // Relasi ke Jadwal
    public function jadwal()
    {
        return $this->hasMany(Jadwal::class, 'ruang_id');
    }
}
