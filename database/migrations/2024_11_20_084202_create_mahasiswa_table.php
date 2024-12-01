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
        Schema::create('mahasiswa', function (Blueprint $table) {
            $table->id();
            $table->string('nim')->unique();
            $table->string('nama');
            $table->string('email');
            $table->string('no_telp');
            $table->year('tahun_masuk');
            $table->decimal('ipk', 3, 2);
            $table->integer('sksk');
            $table->foreignId('kode_prodi')->constrained('prodi')->onDelete('cascade');
            $table->foreignId('kode')->constrained('status_registrasi')->onDelete('cascade');
            $table->foreignId('pembimbing_id')->constrained('pembimbing')->onDelete('cascade');
            $table->string('role')->default('mahasiswa');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mahasiswa');
    }
};
