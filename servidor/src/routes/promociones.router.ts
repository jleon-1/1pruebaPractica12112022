import { Router } from "express";
import { body } from "express-validator";
import { isObjectIdOrHexString } from "mongoose";
import { crearEvento, getEventos } from "../controllers/evento.controller";
import { asignarEventoAPromocion, crearPromocion, getPromociones } from "../controllers/promocion.controller";
import { validarCampos } from "../middleware/validar-campos";
import { validarJWT } from '../middleware/validar-jwt';

export const promocionRouter = Router();

//usuarioRouter.post("/admin", crearUsuarioAdmin);

promocionRouter.get("/", getPromociones)
promocionRouter.post(
   "/",
   [
      body('nombre').isString().withMessage('nombre requerido'),
      body('descuento').isNumeric().withMessage('descuento es un numero'),
      body('fechaInicio').isString().withMessage('fecha inicio requeria'),
      body('fechaFinalizacion').isString().withMessage('fecha fin requerida'),
      body('cantidadMin').isNumeric().withMessage('cantidad minima de boletos para aplicar descuento'),
   ], 
   validarJWT,
   validarCampos,
   crearPromocion
);
promocionRouter.post(
    "/asignar",
    [
       body('idPromocion').isString().withMessage('id de promocion requerida'),
       body('idEvento').isString().withMessage('id de evento requerida'),
    ], 
    validarJWT,
    validarCampos,
    asignarEventoAPromocion
 );