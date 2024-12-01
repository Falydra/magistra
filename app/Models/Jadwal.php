<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jadwal extends Model {
    use HasFactory;

    protected $table = 'jadwal';
    protected $fillable = [
       
        'kode_ruang',
        'kelas',
        'hari',
        'waktu_akhir',
        'kode_mk',
        'waktu_mulai'

    ];

   
    public function tahunAjaran() {
        return $this->belongsTo(TahunAjaran::class);
    }

    public function hari() {
        return $this->belongsTo(Hari::class);
    }

    public function waktu() {
        return $this->belongsTo(Waktu::class);
    }

    public function mataKuliah() {
        return $this->hasMany(MataKuliah::class);
    }

    public function ruangan() {
        return $this->belongsTo(Ruangan::class);
    }
}