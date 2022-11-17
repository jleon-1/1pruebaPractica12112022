import { Request, Response } from "express";
import PerfilService from "../services/perfil";

const obtenerPerfilesPorUsuario = async(req: Request, res: Response) => { 
    const { id } = req.params;

    const respuesta = await PerfilService.obtenerPerfilesdeUsuario(id);

    res.status(200).json(respuesta)
}

export {
    obtenerPerfilesPorUsuario
}