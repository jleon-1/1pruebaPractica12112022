import { Request, Response, NextFunction } from "express";
import UsuarioService from "../services/usuario.service";

const registroUsuario = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const respuesta = await UsuarioService.registrarUsuario(req.body as any);
      res.status(200).json(respuesta);
   } catch (error) {
      next(error);
   }
};

const inicioSesion = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const respuesta = await UsuarioService.inicioSesion(req.body as any);
      res.status(200).json(respuesta);
   } catch (error) {
      next(error);
   }
};

export { registroUsuario, inicioSesion };
