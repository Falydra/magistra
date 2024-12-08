<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class IRSJadwalRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
{
    return [
       
        'id_jadwal' => 'required|array',
        'id_jadwal.*' => 'numeric|exists:jadwal,id',
    ];
}
}