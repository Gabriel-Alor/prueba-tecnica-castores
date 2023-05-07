
export interface AuthResponse {
    error?: string;
    message: string;
    codigo?: string;
    idusuario?: string;
}

export interface Usuario {
    apepaterno: string;
    apematerno: string;
    nombre: string;
    direccion: string;
    fechadeingreso: string;
    nombreusuario: string;
    password: string;
    idtipopersonal: number;
}