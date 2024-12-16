<?php

namespace app\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JadwalProdi extends Model
{
    use HasFactory;

    protected $table = 'jadwal_prodi';
    protected $primaryKey = 'id';
    protected $fillable = [
        'kode_jadwal_prodi',
        'kode_prodi',
        'status',
    ];

    
}