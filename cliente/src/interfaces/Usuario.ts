import { Plan } from "./Plan";

export interface UsuarioResponse {
    usuario: Usuario;
    token:   string;
}

export interface Usuario {
    plan:              string;
    id:                string;
    correo:            string;
    esAdmin:           boolean;
    status:            boolean;
    fechaCreacion:     Date;
    fechaModificacion: Date;
}

export interface UsuarioRegistro {
    correo: string;
    contrasena: string;
    planId?: string;
}

export interface UsuarioForm {
    correo: string;
    contrasena: string;
}

export interface UsuarioReporte {
    plan:              Plan;
    id:                string;
    correo:            string;
    esAdmin:           boolean;
    status:            boolean;
    fechaCreacion:     Date;
    fechaModificacion: Date;
}
