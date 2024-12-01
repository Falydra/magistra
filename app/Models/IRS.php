<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class IRS extends Models {
    use HasFactory;

    protected $table = 'irs';
    protected $primaryKey = 'id';
    protected $fillable = [
        'total_sks',
        'nim',
        'jadwal_id',
        'semester',
        'status',

    ];

    public function mahasiswa(){
        return $this->belongsTo(Mahasiswa::class);
    }

    public function jadwal(){
        return $this->hasMany(Jadwal::class);
    }
    

}