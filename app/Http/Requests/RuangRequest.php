<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RuangRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'kode_ruang' => 'required|string|max:255',
            'kode_gedung' => 'required|string|max:255',
            'kode_prodi' => 'required|string|max:255',
            'kode_fakultas' => 'required|string|exists:fakultas,kode_fakultas',
            'kapasitas' => 'required|integer|min:1',
        ];
    }
}