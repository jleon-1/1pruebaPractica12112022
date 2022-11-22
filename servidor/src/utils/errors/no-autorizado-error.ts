import { ErrorPersonalizado } from "./error-personalizado";

export class NoAutorizadoError extends ErrorPersonalizado {
    codigoStatus = 401; 

    constructor() {
        super('No autorizado');

        Object.setPrototypeOf(this, NoAutorizadoError.prototype);
    }

    serializarError() {
        return [{ mensaje: 'No autorizado' }];
    }
}