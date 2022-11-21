import { Request, Response, NextFunction } from 'express';
import PerfilService, { AgregarPerfilAtributos, EliminarPerfilAtributos } from "../services/perfil";

const obtenerPerfilesPorUsuario = async(req: Request, res: Response) => { 

    const respuesta = await PerfilService.obtenerPerfilesdeUsuario(req.usuario?.id!);

    res.status(200).json(respuesta)
}

const agregarPerfil = async(req: Request<{}, {}, AgregarPerfilAtributos>, res: Response, next: NextFunction) => { 

    try {
        const respuesta = await PerfilService.agregarPerfilUsuario(req.body);
        res.status(200).json(respuesta)
    } catch (error) {
        next(error)
    }

}

const eliminarPerfil = async(req: Request<{}, {}, EliminarPerfilAtributos>, res: Response, next: NextFunction) => { 
    try {
        const respuesta = await PerfilService.eliminarPerfilUsuario(req.body);
        res.status(200).json(respuesta)
    } catch (error) {
        next(error)
    }
}


export {
    obtenerPerfilesPorUsuario,
    agregarPerfil,
    eliminarPerfil
}