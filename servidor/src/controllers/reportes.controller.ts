import { Request, Response, NextFunction } from 'express';
import ReportesService from '../services/reportes';

export const reporteUsuarios = async(req: Request,res: Response) => { 
    const respuesta = await ReportesService.obtenerReportesUsuarios();

    res.status(200).json(respuesta)
}