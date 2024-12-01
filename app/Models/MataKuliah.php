<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MataKuliah extends Model
{
    use HasFactory;
    protected $table = 'mata_kuliah'; 
    protected $fillable = [
        'kode_mk',
        'nama',
        'sks',
        'semester',
        'jenis',
        'kuota',
        'dosen_id',
        'dosen_id_2',
        'dosen_id_3',
    ];

    public function jadwal()
    {
        return $this->hasMany(Jadwal::class, 'id_mk');
    }
}
