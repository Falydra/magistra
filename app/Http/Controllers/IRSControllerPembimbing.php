<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Models\IRS;
use App\Models\Mahasiswa;
use Carbon\Carbon;

class IRSControllerPembimbing extends Controller
{   
    public function approve(Request $request)
    {
        $nims = $request->input('nim');
        $updatedStudents = IRS::whereIn('nim', $nims)
            ->where('status', '!=', 'Disetujui')
            ->update(['status' => 'Disetujui']);
        $students = Mahasiswa::with('irs')->whereIn('nim', $nims)->get();
        return Inertia::location('/pembimbing/persetujuanIRS');
    }
    
    public function cancel(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|array|min:1',
            'student_id.*' => 'exists:irs,nim',
        ]);
        IRS::whereIn('nim', $validated['student_id'])
            ->update(['status' => 'Dibatalkan']);
        return Inertia::location('/pembimbing/persetujuanIRS');
    }
    
}
