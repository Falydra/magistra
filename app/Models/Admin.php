<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Admin extends Model
{
    use HasFactory;

  
    public function users() {
        return $this->morphOne(User::class, 'entity');
    }

    public function name(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => $this->users->name,
            set: fn (?string $value) => $this->users->name,
        );
    }

    public function email(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => $this->users->email,
            set: fn (?string $value) => $this->users->email,
        );
    }
}