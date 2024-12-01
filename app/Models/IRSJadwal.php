<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IRSJadwal extends Model
{
    use HasFactory;
    protected $table = 'irs_jadwal'; // Nama tabel di database

    protected $fillable = [
        'id_irs' , 
        'id_jadwal'          
    ];
}
