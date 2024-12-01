<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JadwalProdi extends Model
{
    use HasFactory;

    protected $table = 'jadwal_prodi';
    protected $fillable = ['kode_jadwal_prodi', 'status'];
}