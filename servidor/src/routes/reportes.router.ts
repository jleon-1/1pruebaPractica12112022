import { Response, Router, Request } from "express";
import { reporteUsuarios } from "../controllers/reportes.controller";

const reportesRouter = Router();

reportesRouter.get('/', reporteUsuarios);

export default reportesRouter;