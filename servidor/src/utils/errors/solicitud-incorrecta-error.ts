import { ErrorPersonalizado } from "./error-personalizado";

export class SolicitudIncorrectaError extends ErrorPersonalizado {
    codigoStatus = 400;

    constructor(public mensaje: string) {
        super(mensaje);

        Object.setPrototypeOf(this, SolicitudIncorrectaError.prototype)
    }

    serializarError() {
        return [{ mensaje: this.mensaje }];
    }
}