<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('jadwal', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kode_ruang')->constrained('ruang');
            $table->foreignId('kelas_id')->constrained('kelas');
            $table->foreignId('hari_id')->constrained('hari');
            $table->foreignId('waktu_id')->constrained('waktu');
            $table->foreignId('dosen_id')->constrained('dosen');
            $table->foreignId('kode_mk')->constrained('matakuliah');
            $table->int('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jadwal');
    }
};
