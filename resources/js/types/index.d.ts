export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    role: number;


}


export interface Ruang {
    id: number;
    kode_ruang: string;
    kode_gedung: string;
    kode_prodi: string;
    kode_fakultas: string;
    is_verif: boolean;
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
    no_telp: string;
    ips: number;
    sksk: number;
    kode_registrasi: string;
    semester: number;

    prodi_id: number;
    pembimbing_id: number;

    user_id: number;
    email: string;

    user_id: number;
    
}

export interface Pembimbing {
    id: number;
    nama: string;
    email: string;
    user_id: number;
    user: User;
}

export interface Kaprodi {
    id: number;
    nama: string;
    namaProdi: string; 
    email: string;
    user_id: number;
    user: User;
}

export interface Dekan {
    id: number;
    nip: string;
    kode_fakultas: string;
    kode_prodi: string;
    kode_fakultas : number;
    
    
}


export interface AkademikAdmin{
    id: number;
    nama: string;
    nomor_telepon: string;
    alamat: string;
    user_id: number;

}


export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    email: boolean;
    
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
    mahasiswa: Mahasiswa[];
}
export type DekanProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    }
    dekan: Dekan[];

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

export type IRS<T extends Record<string, unknown>= Record<string, unknown>> = T & {
    auth: {
        user: User;
    }
    
}
