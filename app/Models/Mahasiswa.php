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
        'ips',
        'sksk',
        'tahun_masuk',
        'nama',
        'email',
        'nomor_telepon',
        'pembimbing_id',
        
    ];

    protected static function booted()
    {
        static::saving(function ($mahasiswa) {
            $currentYear = now()->year;
            $currentMonth = now()->month;

            // Hitung semester
            $yearsPassed = $currentYear - $mahasiswa->tahun_masuk;
            $semestersPassed = $yearsPassed * 2;

            if ($currentMonth > 7) {
                $semestersPassed += 1;
            }

            $mahasiswa->semester = $semestersPassed;
        });
    }


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function pembimbing(){
        return $this->belongsTo(Pembimbing::class);
    }

    public function prodi(){
        return $this->belongsTo(Prodi::class);
    }


    public function irs(){
        return $this->hasMany(Irs::class);
    }

    public function statusregistrasi(){
        return $this->belongsTo(StatusRegistrasi::class);
    }
}