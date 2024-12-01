<?php 

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Gedung extends Model
{
    use HasFactory;

    protected $table = 'gedung';

    protected $primaryKey = 'id';

    protected $fillable = [
        'kode_gedung',
        'nama',
        'alamat',
    ];

    public function ruang()
    {
        return $this->hasMany(Ruang::class);
    }

    public function fakultas()
    {
        return $this->belongsTo(Fakultas::class, 'kode_fakultas', 'kode_fakultas');
    }

    public function prodi()
    {
        return $this->belongsTo(Prodi::class, 'kode_prodi', 'kode_prodi');
    }




}