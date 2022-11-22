import { Request, Response, NextFunction } from "express";
import { UsuarioPayload } from "../middleware/validar-jwt";
import EventoService, { CreacionEvento } from "../services/evento";
import { NoAutorizadoError } from "../utils/errors/no-autorizado-error";

declare global {
    namespace Express {
        interface Request {
            usuario?: UsuarioPayload;
        }
    }
} 

const crearEvento = async (
    req: Request,
    res: Response,
    next: NextFunction
 ) => {
    try {
        if (!req.usuario?.esAdmin) throw new NoAutorizadoError();

       const respuesta = await EventoService.crearEvento(req.body as CreacionEvento);
       res.status(200).json(respuesta);
    } catch (error) {
       next(error);
    }
 };

 const getEventos = async (
    req: Request,
    res: Response,
    next: NextFunction
 ) => {
    try {
       const respuesta = await EventoService.obtenerEventos();
       res.status(200).json(respuesta);
    } catch (error) {
       next(error);
    }
 };

 export {
    crearEvento,
    getEventos
 }