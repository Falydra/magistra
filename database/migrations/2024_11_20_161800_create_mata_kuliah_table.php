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
        Schema::create('mata_kuliah', function (Blueprint $table) {
            $table->id();
            $table->string('kode_mk')->unique();
            $table->string('nama');
            $table->integer('sks');
            $table->integer('semester');
            $table->string('jenis');
            $table->integer('kuota');
            $table->string('dosen_nip');
            $table->string('dosen_nip_2')->nullable();
            $table->string('dosen_nip_3')->nullable();
            $table->foreign('dosen_nip')->references('nip')->on('dosen')->onDelete('cascade');
            $table->foreign('dosen_nip_2')->nullable()->references('nip')->on('dosen')->onDelete('set null');
            $table->foreign('dosen_nip_3')->nullable()->references('nip')->on('dosen')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mata_kuliah');
    }
};
    