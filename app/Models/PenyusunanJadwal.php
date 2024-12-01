<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PenyusunanJadwal extends Model
{
    use HasFactory;

    protected $table = 'penyusunan_jadwal';
    protected $fillable = ['jadwal_prodi_id', 'jadwal_id'];
}