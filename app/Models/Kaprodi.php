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

    public function users() {
        return $this->morphOne(User::class, 'entity');
    }

    // Relasi ke tabel Prodi
    public function prodi()
    {
        return $this->belongsTo(Prodi::class, 'kode_prodi', 'kode_prodi');
    }

    // Relasi ke tabel Dosen (Kaprodinya)
    public function dosen()
    {
        return $this->belongsTo(Dosen::class, 'nip', 'nip');
    }

    // Relasi ke tabel User (untuk koneksi user_id)
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}