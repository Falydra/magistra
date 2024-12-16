<?php
// app/Http/Controllers/Admin/RuangController.php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Ruang;
use App\Models\User;


class RuangController extends Controller
{
    public function updateStatus(Request $request)
    {
       //Selected ruang id from request change to '2' if submitted

       $validated = $request->validate([
        'selectedIds' => 'required|array',
        'selectedIds.*' => 'exists:ruang,id',
        ]);

        \Log::info($validated['selectedIds']);
        Ruang::whereIn('id', $validated['selectedIds'])->update(['is_verif' => '1']);

        return redirect()->route('admin.alokasiruang');

        

        
        
    }

    public function resetStatus(Request $request)
    {
        //Selected ruang id from request change to '1' if submitted

        $validated = $request->validate([
            'selectedIds' => 'required|array',
            'selectedIds.*' => 'exists:ruang,id',
            ]);

            \Log::info($validated['selectedIds']);
            Ruang::whereIn('id', $validated['selectedIds'])->update(['is_verif' => '0']);

            return redirect()->route('admin.alokasiruang');
    }
}