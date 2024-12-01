<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class CustomCsrfMiddleware extends Middleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, \Closure $next)
    {
        // Log untuk debugging
        \Log::info('CSRF Token diterima:', ['token' => $request->header('X-CSRF-TOKEN')]);

        // Lanjutkan ke parent class untuk logika bawaan Laravel
        return parent::handle($request, $next);
    }

    /**
     * Override this method to add routes you want to exclude.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return bool
     */
    protected function shouldPassThrough($request)
    {
        // Tambahkan logika kustom jika ingin mengecualikan route tertentu
        if ($request->is('api/*')) {
            \Log::info('Skipping CSRF for API route:', ['route' => $request->path()]);
            return true;
        }

        return parent::shouldPassThrough($request);
    }
}