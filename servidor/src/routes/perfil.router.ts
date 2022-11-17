import { validarJWT } from './../middlewares/validar-jwt';
import { Response, Router, Request } from "express";
import { crearPlan, obtenerPlanes } from "../controllers/plan.controller";


const perfilRouter = Router();

perfilRouter.get('/:id', obtenerPlanes);

export default perfilRouter;