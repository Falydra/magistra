<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pembayaran extends Model
{
    use HasFactory;

    protected $table = 'pembayaran';
    protected $fillable = [
        
        'status',
        'golongan'
    ];

    public function mahasiswa() {
        return $this->belongsTo(Mahasiswa::class);
    }

    
}