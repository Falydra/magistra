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
        Schema::create('gedung', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('kode_gedung')->unique();
            $table->string('kode_fakultas');
            $table->string('kode_prodi');
            $table->foreign('kode_fakultas')->references('kode_fakultas')->on('fakultas')->onDelete('cascade');
            $table->foreign('kode_prodi')->references('kode_prodi')->on('prodi')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gedung');
    }
};
