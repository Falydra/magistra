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
<<<<<<< HEAD:database/migrations/2024_11_13_031039_create_matakuliah_table.php
            $table->string('kode_mk')->unique();
            $table->string('nama');
            $table->integer('sks');
            $table->string('semester');
            $table->string('jenis');
            $table->foreignId('dosen_id')->constrained('dosen');
=======
>>>>>>> c023858dd564bb205f78d5176325e0d4d5b5ba0d:database/migrations/2024_11_20_074756_create_prodi_table.php
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
