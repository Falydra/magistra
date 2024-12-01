<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IRS extends Model
{
    use HasFactory;
    protected $table = 'irs'; // Nama tabel di database

    protected $fillable = [
        'id_mahasiswa',      
        'id_tahun_ajaran',         
        'status',            
    ];

    public function mahasiswa()
    {
        return $this->belongsTo(Mahasiswa::class, 'id_mahasiswa');
    }

    public function tahunAjaran()
    {
        return $this->belongsTo(TahunAjaran::class, 'id_tahun_ajaran');
    }

    public function jadwal()
    {
        // Relasi Many-to-Many melalui pivot table irs_jadwal
        return $this->belongsToMany(Jadwal::class, 'irs_jadwal', 'id_irs', 'id_jadwal');
    }
}
