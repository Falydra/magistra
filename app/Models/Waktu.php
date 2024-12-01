<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Waktu extends Model
{
    use HasFactory;
    protected $table = 'waktu'; 
    protected $fillable = [
        'waktu_mulai'
    ];

    public function jadwal()
    {
        return $this->hasMany(Jadwal::class, 'id_waktu');
    }
}
