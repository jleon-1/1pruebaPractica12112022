import { NextFunction, Request, Response } from "express";
import { ErrorPersonalizado } from '../utils/errors/error-personalizado';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof ErrorPersonalizado){
        
        return res.status(err.codigoStatus).send({ errores: err.serializarError() })
    }
    

    res.status(400).send({
        errores: [{ mensaje: "Algo salio mal", err }]
    })
}