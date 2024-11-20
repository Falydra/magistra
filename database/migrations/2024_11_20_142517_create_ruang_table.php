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
        Schema::create('ruang', function (Blueprint $table) {
            $table->id();
            $table->string('kode_ruang', 10)->unique();
            $table->integer('kapasitas');
<<<<<<< HEAD:database/migrations/2024_11_13_020104_create_ruang_table.php
            $table->foreignId('kode_fakultas')->constrained('fakultas');
            $table->int('status');
=======
            $table->foreignId('kode_fakultas')->constrained('fakultas')->onDelete('cascade'); 
>>>>>>> c023858dd564bb205f78d5176325e0d4d5b5ba0d:database/migrations/2024_11_20_142517_create_ruang_table.php
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ruang');
    }
};
