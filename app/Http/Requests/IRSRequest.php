<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class IRSRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
{
    return [
        'total_sks' => 'required|numeric|min:1',
   
    ];
}
}