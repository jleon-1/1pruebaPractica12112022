import { validarJWT } from './../middlewares/validar-jwt';
import { Response, Router, Request } from "express";
import { crearPlan, obtenerPlanes } from "../controllers/plan.controller";


const planRouter = Router();

planRouter.post('/', validarJWT, crearPlan)
planRouter.get('/', obtenerPlanes)

export default planRouter;