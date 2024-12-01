<?php

namespace App\Models;  

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fakultas extends Model
{
    use HasFactory;
    protected $table = 'fakultas';
    protected $fillable = ['kode_fakultas', 'nama'];

    public function prodi()
    {
    return $this->hasMany(Prodi::class, 'kode_fakultas');
    }

    public function ruang()
    {
    return $this->hasMany(Ruang::class, 'kode_fakultas');
    }

}


