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
    public function users() {
        return $this->belongsTo(User::class, 'user_id');
    }
}