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
            $table->decimal('ips', 3, 2);
           
            $table->string('kode_prodi');
            
            $table->string('kode_registrasi');
            $table->integer('semester')->default(1);
          
          
            $table->foreign('kode_prodi')->references('kode_prodi')->on('prodi')->onDelete('cascade');
         
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
