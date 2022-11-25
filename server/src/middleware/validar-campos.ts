import { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";

import { ValidacionError } from "../errors/validacion-error";

export const validarCampos = (req: Request, res: Response, next: NextFunction) => {
   const errores = validationResult(req);

   if (!errores.isEmpty()) {
      throw new ValidacionError(errores.array());
   }

   next();
};
