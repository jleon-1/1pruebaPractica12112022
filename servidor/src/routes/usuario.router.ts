import { Response, Router, Request } from "express";
import { registroUsuario, crearUsuarioAdmin, inicioSesion } from "../controllers/usuario.controller";
import { body } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos";
import { validarJWT } from "../middlewares/validar-jwt";

const usuarioRouter = Router();

//usuarioRouter.post("/admin", crearUsuarioAdmin);
usuarioRouter.post(
   "/registro",
   [
      body('correo').isEmail().withMessage('Email inválido'),
      body('contrasena').isLength({min: 4, max: 20}).withMessage('Contraseña inválida'),
      body('planId').isString().withMessage('Id de plan debe ser string')
   ], 
   validarCampos, 
   registroUsuario
);

usuarioRouter.post(
   "/login",
   [
      body('correo').isEmail().withMessage('Email inválido'),
      body('contrasena').isLength({min: 4, max: 20}).withMessage('Contraseña inválida')
   ], 
   validarCampos, 
   inicioSesion
);

export default usuarioRouter;
