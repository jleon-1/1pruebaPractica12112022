import { Request, Response } from "express";
import UsuarioService from '../services/usuario';
import { NoAutorizadoError } from "../utils/errors/no-autorizado-error";

const crearUsuarioAdmin = async(req: Request, res: Response) => {
    const { correo, contrasena } = req.body;

    const respuesta = await UsuarioService.crearAdmin(correo, contrasena);

    res.status(200).json(respuesta)
}

const crearUsuario = async(req: Request,res: Response) => {
    const { correo, contrasena, planId } = req.body;

    console.log(req.usuario?.esAdmin);
    

    if(!req.usuario?.esAdmin) {
        throw new NoAutorizadoError();
    }

    const respuesta = await UsuarioService.crearUsuario(correo, contrasena, planId);

    res.status(200).json(respuesta);
}

export {
    crearUsuarioAdmin,
    crearUsuario
}