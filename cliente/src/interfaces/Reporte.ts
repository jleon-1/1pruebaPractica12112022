import { UsuarioReporte } from './Usuario';

export interface Reporte {
    usuario:  UsuarioReporte;
    perfiles: Perfil[];
}

export interface Perfil {
    nombre:            string;
    imagen:            null;
    usuario:           string;
    status:            boolean;
    fechaCreacion:     Date;
    fechaModificacion: Date;
    id:                string;
}