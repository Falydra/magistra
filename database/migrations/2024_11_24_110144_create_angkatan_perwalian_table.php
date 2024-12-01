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
        Schema::create('angkatan_perwalian', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pembimbing_id')->constrained('pembimbing')->onDelete('cascade');
            $table->string('angkatan_perwalian');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('angkatan_perwalian');
    }
};
