import { validarJWT } from './../middlewares/validar-jwt';
import { Response, Router, Request } from "express";
import { agregarPerfil, eliminarPerfil, obtenerPerfilesPorUsuario } from '../controllers/perfil.controller';


const perfilRouter = Router();

perfilRouter.get('/', validarJWT, obtenerPerfilesPorUsuario);
perfilRouter.post('/agregar', validarJWT, agregarPerfil);
perfilRouter.put('/eliminar', validarJWT, eliminarPerfil);

export default perfilRouter;