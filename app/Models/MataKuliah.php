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
        'dosen_id_3'];

// Relasi ke dosen utama
public function dosenUtama()
{
    return $this->belongsTo(Dosen::class, 'dosen_id');
}

// Relasi ke dosen kedua
public function dosenKedua()
{
    return $this->belongsTo(Dosen::class, 'dosen_id_2');
}

// Relasi ke dosen ketiga
public function dosenKetiga()
{
    return $this->belongsTo(Dosen::class, 'dosen_id_3');
}
}
