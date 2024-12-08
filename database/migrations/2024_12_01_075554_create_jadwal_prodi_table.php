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
        Schema::create('jadwal_prodi', function (Blueprint $table) {
            $table->id();
            $table->string('kode_jadwal_prodi')->unique();
            $table->string('kode_prodi');
            $table->foreign('kode_prodi')->references('kode_prodi')->on('prodi')->onDelete('cascade');
            $table->enum('status', ['Belum disetujui', 'Disetujui', 'Ditolak'])->default('Belum disetujui');
            $table->timestamps();
        });
    }
    };
