import { Request, Response, NextFunction } from "express";
import { UsuarioPayload } from "../middleware/validar-jwt";
import EventoService, { CreacionEvento } from "../services/evento";
import PromocionService, { AsignarEvento, CreacionPromocion } from "../services/promocion";
import { NoAutorizadoError } from "../utils/errors/no-autorizado-error";

declare global {
    namespace Express {
        interface Request {
            usuario?: UsuarioPayload;
        }
    }
} 

const crearPromocion = async (
    req: Request,
    res: Response,
    next: NextFunction
 ) => {
    try {
        if (!req.usuario?.esAdmin) throw new NoAutorizadoError();

       const respuesta = await PromocionService.crearPromocion(req.body as CreacionPromocion);
       res.status(200).json(respuesta);
    } catch (error) {
       next(error);
    }
 };

 const getPromociones = async (
    req: Request,
    res: Response,
    next: NextFunction
 ) => {
    try {
       const respuesta = await PromocionService.obtenerPromociones();
       res.status(200).json(respuesta);
    } catch (error) {
       next(error);
    }
 };

 const asignarEventoAPromocion = async (
    req: Request,
    res: Response,
    next: NextFunction
 ) => {
    try {
       const respuesta = await PromocionService.asignarEvento(req.body as AsignarEvento);
       res.status(200).json(respuesta);
    } catch (error) {
       next(error);
    }
 };

 export {
    crearPromocion,
    getPromociones,
    asignarEventoAPromocion
 }