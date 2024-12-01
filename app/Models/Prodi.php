<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prodi extends Model
{
    use HasFactory;
    protected $table = 'prodi';
    protected $fillable = ['kode_prodi', 'nama'];

    public function fakultas()
    {
        return $this->belongsTo(Fakultas::class, 'kode_fakultas', 'kode_fakultas');
    }

    public function gedung() {
        return $this->hasMany(Gedung::class);
    }
}
