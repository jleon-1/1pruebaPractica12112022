import { Request, Response } from "express";
import PlanService from "../services/plan";
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

export {
    crearPlan,
    obtenerPlanes
}