<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class MataKuliah extends Model
{
    use HasFactory;

    protected $table = 'mata_kuliah';

    protected $fillable = [
        'kode',
        'nama',
        'sks',
        'semester',
    ];

    public function dosen(){
        return $this->belongsToMany(Dosen::class);
    }

    public function ruang(){
        return $this->belongsToMany(Ruang::class, 'kode_ruang', 'kode_ruang');
    }

    public function jadwal(){
        return $this->belongsToMany(Jadwal::class, 'kode_mk', 'kode_mk');
    }

    public function prodi(){
        return $this->belongsToMany(Prodi::class);
    }

    






}