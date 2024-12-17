export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    role: number;


}

export interface Pembayaran {
    id: number;
    nim: Mahasiswa.nim;
    golongan: string;
    semester: number;
}


export interface Ruang {
    id: number;
    kode_ruang: string;
    kode_gedung: string;
    kode_prodi: string;
    kode_fakultas: string;
    is_verif: string;
    kapasitas: number;
}


export interface Prodi {
    id: number;
    kode_prodi: string;
    nama: string;
    kode_fakultas: string;

}

export interface Gedung {
    id: number;
    kode_gedung: string;
    nama: string;
    kode_prodi: string;
    kode_fakultas: string;

}

export interface Mahasiswa{
    id: number;
    nim: string;
    nama: string;
    tahun_masuk: string;
    irs: IRS | null;
    no_telp: string;
    ips: number;
    sksk: number;
    kode_registrasi: string;
    semester: number;
    status_irs: string;
    total_sks: number;
    prodi: string;
    dosen_pembimbing: string;
    user_id: number;
    email: string;
    hasMadeIRS: boolean;
    latest_irs?: IRS;
}

export interface Pembayaran {
    id: number;
    nim: string;
    golongan: string;
    semester: number;
}

export interface Kelas {

}

export interface Pembimbing {
    id: number;
    dosen_id: Dosen;
    nama: string;
    email: string;
    user_id: number;
 
}

export interface Kaprodi {
    id: number;
    nama: string;
    namaProdi: string; 
    email: string;
    user_id: number;
  
}


export interface Dekan {
    id: number;
    nip: string;
    nama: string;
    kode_fakultas : string;
    tahun_periode: string
    
    
}

export interface IRS {
    id: number;
    total_sks: number;
    status: string;
    semester: number;
    nim: string;
}

export interface IRSJadwal {
    id: number
    id_irs: number;
    id_jadwal: number;
    kode_ruang: string;
    kelas: string;
    nama: string;
    semester: number;
    sks: number;
    total_sks: number;
    kuota: number;
    jenis: string;
    dosen_1: string;
    dosen_2?: string;
    dosen_3?: string;
    hari: string;
    waktu_mulai: string;
    waktu_akhir: string;
    kode_mk: string;
}

export interface Hari {
    id: number;
    nama: string;
}

export interface Waktu {
    id: number;
    waktu_mulai: string;
}

export interface Matakuliah {

    id: number;
    kode_mk: string;
    
    nama: string;
    sks: number;
    semester: number;
    jenis: string;
    kuota: number;
    dosen_nip: string;
    dosen_nip_2?: string;
    dosen_nip_3?: string;
}

export interface Kelas {
    id: number;
    kelas: char;
}

export interface JadwalProdi {
    id: number;
    kode_jadwal_prodi: string;
    kode_prodi: string;
    status: string;
}

export interface PenyusunanJadwal {
    id: number
    kode_jadwal_prodi: string;
    jadwal_id: number;
}


export interface Dosen {
    id: number;
    nip: string;
    nidn: string;
    nama: string;
    kode_prodi: string;
}



export interface Jadwal {

    
    id: number;
    kode_ruang: string;
    kelas: string;
    nama: string;
    semester: number;
    kode_prodi: string;
    program_studi: string;
    sks: number;
    kuota: number;
    jenis: string;
    dosen_1: string;
    dosen_2?: string;
    dosen_3?: string;
    hari: string;
    waktu_mulai: string;
    waktu_akhir: string;
    kode_mk: string;
}




export interface AkademikAdmin{
    id: number;
    nama: string;
    nomor_telepon: string;
    alamat: string;
    user_id: number;

}

export interface Angkatan {
    id: number;
    angkatan_perwalian: string;
    id_pembimbing: number;

}


export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    email: boolean;
    
};
export type AngkatanProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    angkatan: Angkatan;
    
};
export type AkademikAdminProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    akademik: AkademikAdmin;
}

export type MahasiswaProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    }
    mahasiswa: Mahasiswa;
    mahasiswaDetail: Mahasiswa;
}

export type PembayaranProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    }
    pembayaran: Pembayaran;
}


export type DekanProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    }
    dekan: Dekan;

}

export type KaprodiProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {

    auth: {
        user: User;
    }
    kaprodi: Kaprodi[];
}

export type PembimbingProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    }

    pembimbing: Pembimbing[];
}



export type RuangProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    
    ruang: Ruang[];
};

export type ProgdiProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
   
    prodi: Prodi;
};

export type IRSProps<T extends Record<string, unknown>= Record<string, unknown>> = T & {
    auth: {
        user: User;
    }
    irs: IRS[];
    
}

export type MatakuliahProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    }
    matakuliah: Matakuliah[];
}

export type JadwalProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    }
    jadwal: Jadwal[];
}

export type KelasProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    }
    kelas: Kelas[];
}

export type IRSJadwalProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    }
    irsJadwal: IRSJadwal[];
}

export type JadwalProdiProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    }
    jadwalProdi: JadwalProdi[];
}
