<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Jadwal extends Model {
    use HasFactory;

    protected $table = 'jadwal';
    protected $fillable = [
        'kode_ruang',
        'kelas',
        'hari',
        'waktu_akhir',
        'kode_mk',
        'waktu_mulai'
    ];

    public function tahunAjaran() {
        return $this->belongsTo(TahunAjaran::class);
    }

    public function hari() {
        return $this->belongsTo(Hari::class);
    }

    public function waktu() {
        return $this->belongsTo(Waktu::class, 'waktu_mulai');
    }

    public function mataKuliah() {
        return $this->belongsTo(MataKuliah::class, 'kode_mk', 'kode_mk');
    }

    public function ruang() {
        return $this->belongsTo(Ruang::class, 'kode_ruang', 'kode_ruang');
    }

    public static function boot() {
        parent::boot();

        static::creating(function ($jadwal) {
            $jadwal->calculateWaktuAkhir();
        });

        static::updating(function ($jadwal) {
            $jadwal->calculateWaktuAkhir();
        });
    }

    public function calculateWaktuAkhir() {
        $mataKuliah = MataKuliah::where('kode_mk', $this->kode_mk)->first();
        if ($mataKuliah) {
            $sks = $mataKuliah->sks;
            $waktuMulai = $this->formatWaktuMulai($this->waktu_mulai);
            if ($waktuMulai) {
                $waktuAkhir = $waktuMulai->copy()->addMinutes($sks * 50);
                $this->waktu_akhir = $waktuAkhir->format('H:i');
            } else {
                throw new \Exception("Invalid waktu_mulai format: {$this->waktu_mulai}");
            }
        }
    }

    private function formatWaktuMulai($waktuMulai) {
        try {
            return Carbon::createFromFormat('H:i', substr($waktuMulai, 0, 5));
        } catch (\Exception $e) {
            return null;
        }
    }

    public function irs() {
        return $this->belongsToMany(Irs::class, 'jadwal_irs', 'id_jadwal', 'id_irs');
    }
}