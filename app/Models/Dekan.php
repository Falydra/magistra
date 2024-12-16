<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Dekan extends Model
{
    use HasFactory;

    protected $table = 'dekan';
    protected $fillable = [
        'tahun_periode',
        'nip',
        'user_id',
    ];

    // morph Pembimbing into User
    public function dekan()
    {
        return $this->hasOne(Dekan::class, 'user_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function fakultas()
    {
        return $this->belongsTo(Fakultas::class, 'kode_fakultas');
    }

    public function dosen()
    {
        return $this->belongsTo(Dosen::class, 'nip');
    }
}