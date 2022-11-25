export interface Promocion {
    eventos:           any[];
    fechaInicio:       Date;
    fechaFinalizacion: Date;
    nombre:            string;
    descuento:         number;
    cantidadMin:       number;
    esGeneral:         boolean;
    estado:            boolean;
    fechaCreacion:     Date;
    fechaModificacion: Date;
    id:                string;
}

export interface PromocionForm {
    nombre:            string;
    descuento:         number;
    fechaInicio:       string;
    fechaFinalizacion: string;
    cantidadMin:       number;
}