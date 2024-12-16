<?php

namespace App\Models;  

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dosen extends Model
{
    use HasFactory;
    protected $table = 'dosen';
    protected $fillable = [
        'nip', 
        'nidn', 
        'nama', 
        'nomor_telepon', 
    ];

    // morph Pembimbing into User
    public function users() {
        return $this->morphOne(User::class, 'entity');
    }

    public function pembimbing()
    {
        return $this->hasMany(Pembimbing::class, 'nip', 'nip');
    }

    public function mataKuliah()
    {
        return $this->belongsToMany(
            MataKuliah::class,         // Model Mata Kuliah
            'dosen',          // Nama tabel pivot
            'dosen_id',                // Foreign key di tabel pivot untuk Dosen
            'matkul_id'                // Foreign key di tabel pivot untuk Mata Kuliah
        );
    }
}
