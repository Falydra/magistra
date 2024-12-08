<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Mahasiswa;
use Inertia\Inertia;

class MahasiswaStatusRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'kode_reqistrasi' => 'required|string|in:aktif,nonaktif',
        ];
    }
}

