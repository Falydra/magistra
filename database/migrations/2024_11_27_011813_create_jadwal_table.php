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
            $table->timestamps();
            $table->foreignId('ruang_id')->constrained('ruang')->onDelete('cascade'); 
            $table->foreignId('kelas_id')->constrained('kelas')->onDelete('cascade'); 
            $table->enum('hari', ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']);
            $table->foreignId('waktu_mulai_id')->constrained('waktu')->onDelete('cascade'); 
            $table->time('waktu_akhir');
            $table->foreignId('matkul_id')->constrained('mata_kuliah')->onDelete('cascade');
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
