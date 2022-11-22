export abstract class ErrorPersonalizado extends Error {
    abstract codigoStatus: number;

    constructor(mensaje: string) {
        super(mensaje);

        Object.setPrototypeOf(this, ErrorPersonalizado.prototype);
    }

    abstract serializarError(): { mensaje: string; campo?: string }[]
}