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
        Schema::create('prodi', function (Blueprint $table) {
            $table->id();

            $table->string('kode_mk')->unique();
            $table->string('nama');
            $table->integer('sks');
            $table->string('semester');
            $table->string('jenis');
            $table->foreignId('dosen_id')->constrained('dosen');


            $table->timestamps();
            $table->string('kode_prodi')->unique();
            $table->string('nama');
            $table->foreignId('kode_fakultas')->constrained('fakultas')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prodi');
    }
};
