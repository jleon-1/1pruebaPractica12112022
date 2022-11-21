import { validarJWT } from './../middlewares/validar-jwt';
import { Response, Router, Request } from "express";
import { contratarPlan, crearPlan, obtenerPlanes } from "../controllers/plan.controller";


const planRouter = Router();

planRouter.post('/', validarJWT, crearPlan)
planRouter.get('/', obtenerPlanes)
planRouter.post('/contratar/:id', validarJWT, contratarPlan)

export default planRouter;