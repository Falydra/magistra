<?php

namespace App\Http\Controllers\Dekan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Dekan;
use Inertia\Inertia;


class DekanController extends Controller
{
    public function index()
    {
        $user = auth()->user(); 
        $dekan = $user->dekan; 

        return Inertia::render('Dekan/Dashboard', [
            'dekan' => $dekan
        ]);
    }

    public function create()
    {
        return view('dekan.create');
    }
}