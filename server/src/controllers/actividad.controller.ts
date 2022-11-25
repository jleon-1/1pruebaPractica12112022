import { Request, Response, NextFunction } from "express";
import { UsuarioPayload } from "../middleware/validar-jwt";
import ActividadService from "../services/actividad.service";

declare global {
   namespace Express {
      interface Request {
         usuario?: UsuarioPayload;
      }
   }
}

const crearActividad = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const respuesta = await ActividadService.crearActividad(
         req.body as any,
         req.usuario?.id!
      );
      res.status(200).json(respuesta);
   } catch (error) {
      next(error);
   }
};

const obtenerActividades = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const respuesta = await ActividadService.obtenerAcividades();
      res.status(200).json(respuesta);
   } catch (error) {
      next(error);
   }
};

const obtenerActividadesUsuario = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const respuesta = await ActividadService.obtenerAcividadesUsuario(req.usuario?.id!);
      res.status(200).json(respuesta);
   } catch (error) {
      next(error);
   }
};

const pausarActivdad = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const respuesta = await ActividadService.pausarActividad(req.params as any);
      res.status(200).json(respuesta);
   } catch (error) {
      next(error);
   }
};

const renaudarActividad = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const respuesta = await ActividadService.renaudarActividad(req.params as any);
      res.status(200).json(respuesta);
   } catch (error) {
      next(error);
   }
};

const cancelarActividad = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const respuesta = await ActividadService.cancelarActividad(req.params as any);
      res.status(200).json(respuesta);
   } catch (error) {
      next(error);
   }
};

const mostrarHistorial = async (
    req: Request,
    res: Response,
    next: NextFunction
 ) => {
    try {
       const respuesta = await ActividadService.obtenerHistorial(req.usuario?.id!);
       res.status(200).json(respuesta);
    } catch (error) {
       next(error);
    }
 };



export {
   crearActividad,
   obtenerActividades,
   obtenerActividadesUsuario,
   pausarActivdad,
   renaudarActividad,
   cancelarActividad,
   mostrarHistorial
};
