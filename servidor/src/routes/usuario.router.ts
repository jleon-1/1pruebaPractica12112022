import { Response, Router, Request } from "express";
import { crearUsuario, crearUsuarioAdmin } from "../controllers/usuario.controller";
import { body } from "express-validator";
import { validarSolicitud } from "../middlewares/validar-solicitud";
import { validarJWT } from "../middlewares/validar-jwt";

const usuarioRouter = Router();

usuarioRouter.post(
   "/admin",
   crearUsuarioAdmin
);
usuarioRouter.post("/", validarJWT, crearUsuario);

export default usuarioRouter;
