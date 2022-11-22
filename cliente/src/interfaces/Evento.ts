import { Usuario } from "./Usuario";

export interface Evento {
    nombre:            string;
    fecha:             Date;
    organizador:       Usuario;
    cantidadEntradas:  number;
    precio:            number;
    estado:            boolean;
    fechaCreacion:     Date;
    fechaModificacion: Date;
    id:                string;
}

export interface EventoForm {
    nombre:            string;
    fecha:             string;
    organizador:       string;
    cantidadEntradas:  number;
    precio:            number; 
}
