<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IRS extends Model
{
    use HasFactory;

    protected $table = 'irs';

    protected $fillable = [
        'nim',
        'total_sks',
        'semester',
        'status',
    ];

    public function mahasiswa()
    {
        return $this->belongsTo(Mahasiswa::class, 'nim', 'nim');
    }

    public function jadwal()
    {
        return $this->hasMany(Jadwal::class);
    }

    public function irsJadwal()
    {
        return $this->hasMany(IRSJadwal::class, 'id_irs', 'id');
    }
}