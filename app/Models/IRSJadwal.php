<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IRSJadwal extends Model
{
    use HasFactory;

    protected $table = 'irs_jadwal';

    protected $fillable = [
        'id_irs',
        'id_jadwal',
    ];

    public function irs()
    {
        return $this->belongsTo(IRS::class, 'id_irs', 'id');
    }

    public function jadwal()
    {
        return $this->belongsTo(Jadwal::class, 'id_jadwal', 'id');
    }
}