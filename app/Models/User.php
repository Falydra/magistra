<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

Relation::morphMap([
    'Admin' => 'App\Models\Admin',
    'Dekan' => 'App\Models\Dekan',
    'Bagian Akademik' => 'App\Models\Akademik',
    'Kepala Program Studi' => 'App\Models\Kaprodi',
    'Pembimbing Akademik' => 'App\Models\Pembimbing',
    'Mahasiswa' => 'App\Models\Mahasiswa',
]);


class User extends Authenticatable
{
    use HasFactory, Notifiable;

    public function role(): BelongsToMany
    {
        return $this->belongsToMany(Role::class);
    }
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    public function hasRole(string $role): bool
    {
        return $this->role === $role;
    }


    public function entity(){
        return $this->morphTo();
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function mahasiswa()
    {
        return $this->hasOne(Mahasiswa::class, 'user_id');
    }

    public function pembimbing()
    {
        return $this->hasOne(Pembimbing::class, 'user_id', 'id');
    }
}
