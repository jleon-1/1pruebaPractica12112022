import { Request, Response, NextFunction } from 'express';
import PlanService, { ContratarPlanAtributos } from "../services/plan";
import { NoAutorizadoError } from "../utils/errors/no-autorizado-error";

const crearPlan = async(req: any ,res: Response) => {
    const { nombre, precio, cantidadPerfiles } = req.body;

    if(!req.usuario?.esAdmin) {
        throw new NoAutorizadoError();
    }
    
    const respuesta = await PlanService.crearPlan(nombre, precio, cantidadPerfiles);

    res.status(200).json(respuesta)
}

const obtenerPlanes = async(req: Request,res: Response) => { 
    const respuesta = await PlanService.obtenerPlanes();

    res.status(200).json(respuesta)
}

const contratarPlan = async(req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const atributosContrato = {
        usuarioId: req.usuario?.id!,
        planId: id
    }

    try {
        const respuesta = await PlanService.contratarPlan(atributosContrato);
        res.status(200).json(respuesta)
    } catch (error) {
        next(error)
    }
}

export {
    crearPlan,
    obtenerPlanes,
    contratarPlan
}