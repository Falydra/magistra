<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AngkatanPerwalian extends Model
{
    use HasFactory;

    protected $table = 'angkatan';
    protected $fillable = ['pembimbing_id', 'angkatan_perwalian'];

    public function pembimbing()
    {
        return $this->belongsTo(Pembimbing::class, 'pembimbing_id'); 
    }

    public function mahasiswa()
    {
        return $this->hasMany(Mahasiswa::class, 'angkatan_perwalian_id');
    }
    
}
