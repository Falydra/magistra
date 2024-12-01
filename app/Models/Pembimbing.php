<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;


class Pembimbing extends Model
{
    use HasFactory;

    protected $table = 'pembimbing';
    protected $fillable = [
        'angkatan_perwalian',
        'kelas_perwakilan',
        'nip',
        'role',
        'user_id'
    ];

    // morph Pembimbing into User
    public function users() {
        return $this->morphOne(User::class, 'entity');
    }
}