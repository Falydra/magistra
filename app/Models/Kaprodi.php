<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Kaprodi extends Model
{
    use HasFactory;

    protected $table = 'kaprodi';
    protected $fillable = [
        'tahun_periode',
        'kode_prodi',
        'nip',
        'user_id',
    ];

    // morph Pembimbing into User
    public function users() {
        return $this->morphOne(User::class, 'entity');
    }
}