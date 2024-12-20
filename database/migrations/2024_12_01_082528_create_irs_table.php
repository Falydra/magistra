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
        Schema::create('irs', function (Blueprint $table) {
            $table->id();
            $table->integer('total_sks');
            //Nim
            $table->string('nim');
            $table->integer('semester');
            
            $table->enum('status', ['Belum Disetujui', 'Diajukan', 'Disetujui', 'Diizinkan', 'Dibatalkan']);
            $table->enum('is_submitted', ['1', '0'])->default('0');

            

            $table->foreign('nim')->references('nim')->on('mahasiswa')->onDelete('cascade');
           
        

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('irs');
    }
};
