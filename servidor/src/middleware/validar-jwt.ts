import { NextFunction, Request, Response } from "express";
import { NoAutorizadoError } from "../utils/errors/no-autorizado-error";
import jwt from 'jsonwebtoken';

import { Usuario } from "../models/usuario.model";

export interface UsuarioPayload {
    id: string
    username: string;
    esAdmin: boolean
}

declare global {
    namespace Express {
        interface Request {
            usuario?: UsuarioPayload;
        }
    }
}

export const validarJWT = async ( req: Request, res: Response, next: NextFunction ) => {

    const token = req.header('Authorization');

    if ( !token ) {
        throw new NoAutorizadoError();
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_KEY!) as UsuarioPayload;
        
        // leer el usuario que corresponde al uid
        const usuario = await Usuario.findById( payload.id );
        
        if( !usuario ) {
            throw new NoAutorizadoError();
        }
        
        
        
        // Verificar si el uid tiene estado true
        // if ( usuario!.estado ) {
        //     console.log(usuario.estado);
        //     throw new NoAutorizadoError();
        // }
        
        req.usuario = usuario as UsuarioPayload;
        next();
    } catch (error) {    
        res.status(401).json(error)
    }

}