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
        Schema::create('pembimbing', function (Blueprint $table) {
            $table->id();

            $table->foreignId('dosen_id')->constrained('dosen')->onDelete('cascade');

            $table->string('angkatan_perwalian');
            $table->char('kelas_perwalian');
            $table->foreignId('nip')->constrained('dosen')->onDelete('cascade');
            $table->string('role')->default('pembimbing');

            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pembimbing');
    }
};
