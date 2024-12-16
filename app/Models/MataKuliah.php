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
        'kode_mk', 
        'nama', 
        'sks', 
        'semester', 
        'jenis', 
        'kuota', 
        'jumlah_kelas',
        'dosen_nip', 
        'dosen_nip_2', 
        'dosen_nip_3'];

    public function dosenUtama()
    {
        return $this->belongsTo(Dosen::class, 'dosen_nip', 'nip');
    }

    public function dosenKedua()
    {
        return $this->belongsTo(Dosen::class, 'dosen_nip_2', 'nip');
    }

    public function dosenKetiga()
    {
        return $this->belongsTo(Dosen::class, 'dosen_nip_3', 'nip');
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

    public function kelas()
    {
        return $this->hasMany(Kelas::class, 'kode_mk');
    }

    






}