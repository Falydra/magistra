<?php

namespace App\Models;  

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dosen extends Model
{
    use HasFactory;
    protected $table = 'dosen';
    protected $fillable = [
        'nip', 
        'nidn', 
        'nama', 
        'nomor_telepon', 
        'alamat', 
    ];

    // morph Pembimbing into User
    public function users() {
        return $this->morphOne(User::class, 'entity');
    }
}
