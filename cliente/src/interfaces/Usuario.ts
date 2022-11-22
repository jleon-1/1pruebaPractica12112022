export interface UsuarioForm {
    username: string;
    contrasena: string;
}

export interface UsuarioRegistro {
    username: string;
    contrasena: string;
}

export interface Usuario {
    id:                string;
    username:            string;
    esAdmin:           boolean;
    estado:            boolean;
    fechaCreacion:     Date;
    fechaModificacion: Date;
}

export interface UsuarioResponse {
    usuario: Usuario;
    token:   string;
}