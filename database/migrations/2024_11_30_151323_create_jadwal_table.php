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
            $table->foreignId('id_ruang')->constrained('ruang')->onDelete('cascade');
            $table->foreignId('id_kelas')->constrained('kelas')->onDelete('cascade');
            $table->foreignId('id_hari')->constrained('hari')->onDelete('cascade');
            $table->foreignId('id_waktu')->constrained('waktu')->onDelete('cascade');
            $table->foreignId('id_mk')->constrained('mata_kuliah')->onDelete('cascade');
            $table->string('status')->default('Belum Disetujui');
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
