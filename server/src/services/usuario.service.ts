import { SolicitudIncorrectaError } from './../errors/solicitud-incorrecta-error';

import jwt from "jsonwebtoken"
import { Usuario } from "../models/usuario.model";
import { PasswordManager } from "./password-manager";

export default class UsuarioService{
    static async registrarUsuario(registroAtributos: any) {
        const { username, contrasena } = registroAtributos;

        const existeUsuario = await Usuario.findOne({ username });

        if (existeUsuario) {
            throw new SolicitudIncorrectaError('Ya existe usuario');
        }

        const usuario = Usuario.build({ username, contrasena });
        await usuario.save();

        const usuarioJwt = jwt.sign(
            {
                id: usuario.id,
                username: usuario.username,
            }, 
            process.env.JWT_KEY!
        );

        return {
            usuario: usuario,
            token: usuarioJwt
        }
    }

    static async inicioSesion(loginAtributos: any) {
        const { username, contrasena } = loginAtributos;

        const usuarioExistente = await Usuario.findOne({ username });
        if(!usuarioExistente) {
            throw new SolicitudIncorrectaError('No existe usuario');
        }

        const verificarContrasena = await PasswordManager.compare(
            usuarioExistente.contrasena,
            contrasena
        );
        if(!verificarContrasena) {
            throw new SolicitudIncorrectaError('Contraseña incorrecta');
        }

        const usuarioJwt = jwt.sign(
            {
                id: usuarioExistente.id,
                username: usuarioExistente.username,
            }, 
            process.env.JWT_KEY!
        );

        return {
            usuario: usuarioExistente,
            token: usuarioJwt
        }
    }
}