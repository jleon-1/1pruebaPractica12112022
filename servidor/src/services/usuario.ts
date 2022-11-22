import { Request } from "express";
import jwt from "jsonwebtoken"

import { Usuario } from "../models/usuario.model";
import { SolicitudIncorrectaError } from "../utils/errors/solicitud-incorrecta-error";
import { PasswordManager } from "./password-manager";

export interface RegistroAtributos {
    username: string;
    contrasena: string;
}

export interface InicioSesionAtributos {
    username: string;
    contrasena: string;
}

export default class UsuarioService{
    static async registrarUsuario(registroAtributos: RegistroAtributos) {
        const { username, contrasena } = registroAtributos;

        const existeEmail = await Usuario.findOne({ username });

        if (existeEmail) {
            throw new SolicitudIncorrectaError('Username ya en uso');
        }

        const usuario = Usuario.build({ username, contrasena });
        await usuario.save();

        const usuarioJwt = jwt.sign(
            {
                id: usuario.id,
                username: usuario.username,
                esAdmin: usuario.esAdmin,
            }, 
            process.env.JWT_KEY!
        );

        return {
            usuario: usuario,
            token: usuarioJwt
        }
    }

    static async inicioSesion(atributos: InicioSesionAtributos) {
        const { username, contrasena } = atributos;

        const usuarioExistente = await Usuario.findOne({ username });
        if(!usuarioExistente) {
            throw new SolicitudIncorrectaError('Correo invalido');
        }

        const verificarContrasena = await PasswordManager.compare(
            usuarioExistente.contrasena,
            contrasena
        );
        if(!verificarContrasena) {
            throw new SolicitudIncorrectaError('Contraseña invalida')
        }

        const usuarioJwt = jwt.sign(
            {
                id: usuarioExistente.id,
                username: usuarioExistente.username,
                esAdmin: usuarioExistente.esAdmin,
            }, 
            process.env.JWT_KEY!
        );

        return {
            usuario: usuarioExistente,
            token: usuarioJwt
        }
    }
}