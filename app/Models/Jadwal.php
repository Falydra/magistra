<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jadwal extends Model
{
    use HasFactory;
    protected $table = 'jadwal'; 

    protected $fillable = [
        'id_ruang',  
        'id_kelas', 
        'id_hari',  
        'id_waktu',
        'id_mk',    
        'status',  
    ];

    public function irs()
    {
        // Relasi Many-to-Many melalui pivot table irs_jadwal
        return $this->belongsToMany(IRS::class, 'irs_jadwal', 'id_jadwal', 'id_irs');
    }

    // Relasi ke Ruang
    public function ruang()
    {
        return $this->belongsTo(Ruang::class, 'id_ruang');
    }

    // Relasi ke Kelas
    public function kelas()
    {
        return $this->belongsTo(Kelas::class, 'id_kelas');
    }

    // Relasi ke Hari
    public function hari()
    {
        return $this->belongsTo(Hari::class, 'id_hari');
    }

    // Relasi ke Waktu
    public function waktu()
    {
        return $this->belongsTo(Waktu::class, 'id_waktu');
    }

    // Relasi ke MataKuliah
        public function mataKuliah()
    {
        return $this->belongsTo(MataKuliah::class, 'id_mk');
    }
}
