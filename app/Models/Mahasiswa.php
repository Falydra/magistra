<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mahasiswa extends Model
{
    use HasFactory;

    protected $fillable = [
        'nim', 
        'nama', 
        'email', 
        'no_telp', 
        'alamat', 
        'tahun_masuk', 
        'ipk', 
        'sksk', 
        'kode_prodi', 
        'kode', 
        'pembimbing_id', 
        'role', 
        'user_id'
    ];

    // morph Mahasiswa into User
    public function users() {
        return $this->morphOne(User::class, 'entity');
    }
}