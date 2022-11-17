import jwt from "jsonwebtoken"

import { Usuario } from "../models/usuario.model";
import { SolicitudIncorrectaError } from "../utils/errors/solicitud-incorrecta-error";

export default class UsuarioService{
    static async crearAdmin(correo: string, contrasena: string) {
        const existeEmail = await Usuario.findOne({ correo });

        if (existeEmail) {
            throw new SolicitudIncorrectaError('Email ya en uso');
        }

        const usuarioAdmin = Usuario.build({ correo, contrasena });
        usuarioAdmin.esAdmin = true;
        await usuarioAdmin.save();

        const usuarioJwt = jwt.sign(
            {
                id: usuarioAdmin.id,
                correo: usuarioAdmin.correo,
                contrasena: usuarioAdmin.contrasena,
                esAdmin: usuarioAdmin.esAdmin,
                status: usuarioAdmin.status
            }, 
            process.env.JWT_KEY!
        );
        
            console.log(usuarioAdmin)

        return {
            usuario: usuarioAdmin,
            token: usuarioJwt
        }
    }

    static async crearUsuario(correo: string, contrasena: string, planId: string) {
        const existeEmail = await Usuario.findOne({ correo });

        if (existeEmail) {
            throw new SolicitudIncorrectaError('Email ya en uso');
        }

        const usuario = Usuario.build({ correo, contrasena, planId });
        await usuario.save();

        const usuarioJwt = jwt.sign(
            {
                id: usuario.id,
                correo: usuario.correo,
                contrasena: usuario.contrasena,
                esAdmin: usuario.esAdmin,
                status: usuario.status
            }, 
            process.env.JWT_KEY!
        );

        return {
            usuario: usuario,
            token: usuarioJwt
        }
    }
}