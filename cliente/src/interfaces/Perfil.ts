export interface Perfil {
    nombre:            string;
    imagen:            null;
    usuario:           string;
    status:            boolean;
    fechaCreacion:     Date;
    fechaModificacion: Date;
    id:                string;
}

export interface PerfilForm {
    usuarioId: string | undefined; 
    nombrePerfil: string;
}

export interface PerfilDelete {
    usuarioId: string | undefined; 
    perfilId: string;
}