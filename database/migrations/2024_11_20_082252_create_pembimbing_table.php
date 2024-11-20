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
<<<<<<< HEAD:database/migrations/2024_11_12_043010_create_pembimbing_table.php
            $table->foreignId('dosen_id')->constrained('dosen')->onDelete('cascade');
=======
            $table->string('angkatan_perwalian');
            $table->char('kelas_perwalian');
            $table->foreignId('nip')->constrained('dosen')->onDelete('cascade');
            $table->string('role')->default('pembimbing');
>>>>>>> c023858dd564bb205f78d5176325e0d4d5b5ba0d:database/migrations/2024_11_20_082252_create_pembimbing_table.php
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
