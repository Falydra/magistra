export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    role: number;


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
    namaDekan: string;
    namaFakultas: string;
    email: string;
    user_id: number;
    user: User;
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

export type IRS<T extends Record<string, unknown>= Record<string, unknown>> = T & {
    auth: {
        user: User;
    }
    
}
