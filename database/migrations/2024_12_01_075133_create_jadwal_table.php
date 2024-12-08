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
            $table->string('kode_ruang');
            $table->string('kelas');
            $table->enum('hari', ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']);
            $table->time('waktu_akhir');
            $table->time('waktu_mulai');
            $table->string('kode_mk');
            
            $table->foreign('kode_ruang')->references('kode_ruang')->on('ruang')->onDelete('cascade');
            $table->foreign('kode_mk')->references('kode_mk')->on('mata_kuliah')->onDelete('cascade');
            $table->foreign('kelas')->references('kelas')->on('kelas')->onDelete('cascade');
            $table->foreign('waktu_mulai')->references('waktu_mulai')->on('waktu')->onDelete('cascade');
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
