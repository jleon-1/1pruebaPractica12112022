import { ErrorPersonalizado } from './error-personalizado';

export class NoEncontradoError extends ErrorPersonalizado {
    codigoStatus = 404;

    constructor() {
        super('Ruta no encontrada');

        Object.setPrototypeOf(this, NoEncontradoError.prototype);
    }

    serializarError() {
        return [
            {
                mensaje: 'Ruta no encontrada'
            }
        ]
    }
}