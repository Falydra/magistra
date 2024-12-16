<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;


class Pembimbing extends Model
{
    use HasFactory;

    protected $table = 'pembimbing';
    protected $fillable = [
        'nip',
       

    ];

    // morph Pembimbing into User
    public function users() {
        return $this->morphOne(User::class, 'entity');
    }

    public function mahasiswa(){
        return $this->hasMany(Mahasiswa::class, 'pembimbing_id');
    }

    public function angkatanPerwalian() {
        return $this->hasMany(AngkatanPerwalian::class, 'pembimbing_id');
    }

    public function dosen()
    {
        return $this->belongsTo(Dosen::class, 'nip', 'nip');
    }
}