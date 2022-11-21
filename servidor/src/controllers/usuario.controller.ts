import { Request, Response, NextFunction } from "express";
import UsuarioService, {
   InicioSesionAtributos,
   RegistroAtributos,
} from "../services/usuario";
import { NoAutorizadoError } from "../utils/errors/no-autorizado-error";

const crearUsuarioAdmin = async (req: Request, res: Response) => {
   const { correo, contrasena } = req.body;

   const respuesta = await UsuarioService.crearAdmin(correo, contrasena);

   res.status(200).json(respuesta);
};

const registroUsuario = async (
   req: Request<{}, {}, RegistroAtributos>,
   res: Response,
   next: NextFunction
) => {
   try {
      const respuesta = await UsuarioService.registrarUsuario(req.body);
      res.status(200).json(respuesta);
   } catch (error) {
      next(error);
   }
};

const inicioSesion = async (
   req: Request<{}, {}, InicioSesionAtributos>,
   res: Response,
   next: NextFunction
) => {
   try {
      const respuesta = await UsuarioService.inicioSesion(req.body);
      res.status(200).json(respuesta);
   } catch (error) {
      next(error);
   }
};

export { crearUsuarioAdmin, registroUsuario, inicioSesion };
