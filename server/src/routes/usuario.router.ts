import { Response, Router, Request } from "express";
import { registroUsuario, inicioSesion } from "../controllers/usuario.controller";
import { body } from "express-validator";
import { validarCampos } from '../middleware/validar-campos';


const usuarioRouter = Router();

//usuarioRouter.post("/admin", crearUsuarioAdmin);
usuarioRouter.post(
   "/registro",
   [
      body('username').isLength({min: 3, max: 20}).withMessage('Username inválido debe tener mas de 3 caracteres'),
      body('contrasena').isLength({min: 2, max: 20}).withMessage('Contraseña inválida'),
   ], 
   validarCampos, 
   registroUsuario
);

usuarioRouter.post(
   "/login",
   [
      body('username').isLength({min: 2, max: 20}).withMessage('Username inválido debe tener mas de 3 caracteres'),
      body('contrasena').isLength({min: 2, max: 20}).withMessage('Contraseña inválida')
   ], 
   validarCampos, 
   inicioSesion
);

export default usuarioRouter;
