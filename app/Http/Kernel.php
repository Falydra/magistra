<?php
namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;
use App\Http\Middleware\EnsureUserIsAdmin;
use App\Http\Middleware\EnsureUserIsMahasiswa;

class Kernel extends HttpKernel
{
    // ...

    /**
     * The application's route middleware.
     *
     * These middleware may be assigned to groups or used individually.
     *
     * @var array
     */


    protected $Middleware = [
        // ...
        // 'admin' => \App\Http\Middleware\EnsureUserIsAdmin::class,
        // 'mahasiswa' => \App\Http\Middleware\EnsureUserIsMahasiswa::class,
        \App\Http\Middleware\CustomCsrfMiddleware::class,
    ];

}