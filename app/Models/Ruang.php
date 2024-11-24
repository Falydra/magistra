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

    protected $table = 'ruang';

    protected $primaryKey = 'id';

    protected $fillable = [
        'kode_ruang',
        'kapasitas',
        'kode_fakultas',
    ];
}