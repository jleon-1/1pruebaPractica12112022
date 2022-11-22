import { Router } from "express";
import { body } from "express-validator";
import { isObjectIdOrHexString } from "mongoose";
import { crearEvento, getEventos } from "../controllers/evento.controller";
import { validarCampos } from "../middleware/validar-campos";
import { validarJWT } from '../middleware/validar-jwt';

export const eventoRouter = Router();

//usuarioRouter.post("/admin", crearUsuarioAdmin);

eventoRouter.get("/", getEventos)
eventoRouter.post(
   "/",
   [
      body('nombre').isString().withMessage('nombre requerido'),
      body('fecha').isString().withMessage('fecha requerida'),
      body('organizador').isString().withMessage('organizador requerida'),
      body('cantidadEntradas').isNumeric().withMessage('cantidad de entradas debe ser un numero'),
      body('precio').isNumeric().withMessage('precio debe ser un numero'),
   ], 
   validarJWT,
   validarCampos,
   crearEvento
);