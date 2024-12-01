<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */

    // Untuk dekan
    public function up(): void
    {
        Schema::create('jadwal_prodi', function (Blueprint $table) {
            $table->id();
            $table->string('kode_jadwal_prodi');
            $table->enum('status', ['belum disetujui', 'disetujui', 'ditolak'])->default('belum disetujui');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jadwal_prodi');
    }
};
