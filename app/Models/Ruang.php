<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ruang extends Model
{
    use HasFactory;

    public function fakultas()
    {
        return $this->belongsTo(Fakultas::class, 'kode_fakultas', 'kode_fakultas');
    }

    public function gedung()
    {
        return $this->belongsTo(Gedung::class, 'kode_gedung', 'kode_gedung');
    }

    protected $table = 'ruang';

    protected $primaryKey = 'id';

    protected $fillable = [
        'kode_ruang',
        'kode_gedung',
        'kode_prodi',
        'kapasitas',
        'kode_fakultas',
    ];

    public function jadwal()
    {
        return $this->hasMany(Jadwal::class, 'kode_ruang', 'kode_ruang');
    }
}