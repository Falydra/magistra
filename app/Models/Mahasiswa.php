<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mahasiswa extends Model
{
    use HasFactory;

    protected $table = 'mahasiswa';
    protected $fillable = [
        'nim',
        'program_studi',
        'semester',
        'ipk',
        'alamat',
        'nomor_telepon',
    ];

    // morph Mahasiswa into User
    public function users() {
        return $this->morphOne(User::class, 'entity');
    }

    public function pembimbing(){
        return $this->belongsTo(Pembimbing::class);
    }

    public function angkatanPerwalian()
    {
        return $this->belongsTo(AngkatanPerwalian::class, 'angkatan', 'angkatan_perwalian');
    }

    public function irs()
    {
        return $this->hasOne(Irs::class, 'id_mahasiswa', 'id');
    }

    public function getTotalSksAttribute()
    {
        return $this->jadwal()->sum('mataKuliah.sks');
    }
    
}