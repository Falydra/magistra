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
            $table->id(); // Primary key
            $table->string('nim')->unique(); // Unique constraint
            $table->string('nama');
            $table->string('email')->unique();
            $table->string('nomor_telepon');
            $table->text('alamat');
            $table->year('tahun_masuk');
            $table->string('status');
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