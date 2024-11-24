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
    nama_ruang: string;
    kode_fakultas: string;
}


export interface Prodi {
    id: number;
    kode_prodi: string;
    nama: string;
    kode_fakultas: string;

}

export interface Mahasiswa{
    id: number;
    nim: string;
    nama: string;
    jurusan: string;
    angkatan: string;
    email: string;
    user_id: number;
    user: User;
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

export interface Fakultas {
    id: number;
  
    nama: string;
    kode_fakultas : number;
    
    
}


export interface AkademikAdmin{
    id: number;
    nama: string;
    email: string;
    user_id: number;
    user: User;
}


export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    email: boolean;
    
};



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
