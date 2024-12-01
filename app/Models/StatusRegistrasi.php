<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StatusRegistrasi extends Model
{
    use HasFactory;

    protected $table = 'status_registrasi';
    protected $fillable = [
        'kode_registrasi',
        'nama',
    ];
}