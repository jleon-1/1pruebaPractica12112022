import { ValidationError } from "express-validator";

import { ErrorPersonalizado } from "./error-personalizado";

export class ValidacionError extends ErrorPersonalizado {
    codigoStatus = 400;

    constructor(public errores: ValidationError[]) {
        super('Error en validacion de parametros');

        //only because we are extending a built in class
        Object.setPrototypeOf(this, ValidacionError.prototype);
    }

    serializarError() {
        return this.errores.map((error) => {
            return { mensaje: error.msg, campo: error.param };
        });
    }
}