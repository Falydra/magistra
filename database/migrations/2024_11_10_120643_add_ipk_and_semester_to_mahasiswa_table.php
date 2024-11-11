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
        Schema::table('mahasiswa', function (Blueprint $table) {
            
            $table->float('ipk')->default(0)->after('alamat'); // Add IPK (GPA) column as float
            $table->integer('semester')->default(5)->after('ipk'); 
            $table->string('prodi')->after('semester');
            // Add semester column as integer
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mahasiswa', function (Blueprint $table) {
            $table->dropColumn('ipk');
            $table->dropColumn('semester');
        });
    }
};