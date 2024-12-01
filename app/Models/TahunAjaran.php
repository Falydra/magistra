<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TahunAjaran extends Model
{
    use HasFactory;
    protected $table = 'tahun_ajaran'; 
    protected $fillable = [
        'tahun',
        'periode',
    ];

    public function irs()
    {
        return $this->hasMany(IRS::class, 'id_tahun_ajaran');
    }

}
