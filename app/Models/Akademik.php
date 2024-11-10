<?php 

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;


class Akademik extends Model
{
    use HasFactory;

    protected $table = 'akademik';


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nama',
        'nip',
    ];

    public function name(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => $this->users->name,
            set: fn (?string $value) => $this->users->name,
        );
    }

    public function user(){
        return $this->morphOne(User::class, 'entity');
    }

    public function email(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => $this->users->email,
            set: fn (?string $value) => $this->users->email,
        );
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
}