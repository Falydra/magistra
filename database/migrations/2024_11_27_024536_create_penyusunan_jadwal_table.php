<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */

     //Kumpulan jadwal id untuk jadwal_prodi
    public function up(): void
    {
        Schema::create('penyusunan_jadwal', function (Blueprint $table) {
            $table->id(); 
            $table->foreignId('jadwal_prodi_id')->constrained('jadwal_prodi')->onDelete('cascade');    
            $table->foreignId('jadwal_id')->constrained('jadwal')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penyusunan_jadwal');
    }
};
