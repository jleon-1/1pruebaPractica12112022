import { Router } from "express";
import { validarJWT } from '../middleware/validar-jwt';
import { cancelarActividad, crearActividad, mostrarHistorial, obtenerActividades, obtenerActividadesUsuario, pausarActivdad, renaudarActividad } from "../controllers/actividad.controller";


const actividadRouter = Router();

//usuarioRouter.post("/admin", crearUsuarioAdmin);
actividadRouter.get('/', obtenerActividades);
actividadRouter.get('/usuario', validarJWT, obtenerActividadesUsuario);
actividadRouter.post('/crear', validarJWT, crearActividad);
actividadRouter.post('/pausar/:id', validarJWT, pausarActivdad);
actividadRouter.post('/renaudar/:id', validarJWT, renaudarActividad);
actividadRouter.post('/cancelar/:id', validarJWT, cancelarActividad);
actividadRouter.get('/historial', validarJWT, mostrarHistorial);

export default actividadRouter;
