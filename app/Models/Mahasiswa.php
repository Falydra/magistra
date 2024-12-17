<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mahasiswa extends Model
{
    use HasFactory;

    protected $table = 'mahasiswa';
    protected $fillable = [
        'nim',
        'program_studi',
        'semester',
        'ips',
        'sksk',
        'tahun_masuk',
        'nama',
        'email',
        'nomor_telepon',
        'pembimbing_id',
    ];

    protected static function booted()
    {
        static::saving(function ($mahasiswa) {
            $currentYear = now()->year;
            $currentMonth = now()->month;

            // Hitung semester
            $yearsPassed = $currentYear - $mahasiswa->tahun_masuk;
            $semestersPassed = $yearsPassed * 2;

            if ($currentMonth > 7) {
                $semestersPassed += 1;
            }

            $mahasiswa->semester = $semestersPassed;
        });

        static::saved(function ($mahasiswa) {
            $mahasiswa->createIRSAndJadwal();
        });
    }

    public function getTotalSksAttribute()
    {
        return $this->irs()->sum('total_sks');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function pembimbing()
    {
        return $this->belongsTo(Pembimbing::class, 'pembimbing_id');	
    }

    public function prodi()
    {
        return $this->belongsTo(Prodi::class, 'kode_prodi', 'kode_prodi');
    }

    public function irs()
    {
        return $this->hasMany(IRS::class, 'nim', 'nim');
    }

    public function statusregistrasi()
    {
        return $this->belongsTo(StatusRegistrasi::class);
    }

    // Relasi Sherli
    public function angkatanPerwalian()
    {
        return $this->belongsTo(AngkatanPerwalian::class, 'angkatan_perwalian_id');
    }


    public function hasMadeIRS()
    {
        return $this->irs()->exists();
    }

    public function createIRSAndJadwal()
    {
        if ($this->semester > 1) {
            for ($sem = 1; $sem < $this->semester; $sem++) {
                $irs = IRS::firstOrCreate([
                    'nim' => $this->nim,
                    'semester' => $sem,
                ], [
                    'total_sks' => 0,
                    'status' => 'Belum Disetujui',
                ]);

                // If the IRS semester is below the Mahasiswa semester, mark it as "Disetujui"
                if ($sem < $this->semester) {
                    $irs->update(['status' => 'Disetujui']);
                }

                $maxSKS = $this->ips >= 3.0 ? 24 : 20; // Determine max SKS based on IPS
                $totalSKS = 0;

                // Get Mata Kuliah for the current semester with jenis = Wajib
                $mataKuliahQuery = MataKuliah::where('semester', '=', $sem )
                    ->where('jenis', 'Wajib')
                    ->orderBy('kode_mk', 'asc')
                    ->get();

                // Select jadwal with the same kode_mk as mata kuliah
                $jadwalQuery = Jadwal::whereIn('kode_mk', $mataKuliahQuery->pluck('kode_mk'))->get();

                foreach ($mataKuliahQuery as $mataKuliah) {
                    $jadwal = $jadwalQuery->firstWhere('kode_mk', $mataKuliah->kode_mk);
                    if ($jadwal && $totalSKS + $mataKuliah->sks <= $maxSKS) {
                        IRSJadwal::firstOrCreate([
                            'id_irs' => $irs->id,
                            'id_jadwal' => $jadwal->id,
                        ]);
                        $totalSKS += $mataKuliah->sks;
                    }
                }

                // Fill the remaining SKS with Mata Kuliah from semesters above the current IRS semester
                if ($totalSKS < $maxSKS) {
                    $remainingSKS = $maxSKS - $totalSKS;
                    $mataKuliahAboveQuery = MataKuliah::where('semester', '=', ($sem + 2))
                        ->orWhere('semester', '=', ($sem + 4))
                        ->orderBy('kode_mk', 'asc')
                        ->get();

                    foreach ($mataKuliahAboveQuery as $mataKuliah) {
                        $jadwal = $jadwalQuery->firstWhere('kode_mk', $mataKuliah->kode_mk);
                        if ($jadwal && $totalSKS + $mataKuliah->sks <= $maxSKS) {
                            IRSJadwal::firstOrCreate([
                                'id_irs' => $irs->id,
                                'id_jadwal' => $jadwal->id,
                            ]);
                            $totalSKS += $mataKuliah->sks;
                        }
                    }
                }

                $irs->update(['total_sks' => $totalSKS]);
            }
        }
    }
}