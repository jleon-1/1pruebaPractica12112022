import { Request } from "express";
import jwt from "jsonwebtoken"

import { Usuario } from "../models/usuario.model";
import { SolicitudIncorrectaError } from "../utils/errors/solicitud-incorrecta-error";
import { PasswordManager } from "./password-manager";

export interface RegistroAtributos {
    correo: string;
    contrasena: string;
    plan: string;
}

export interface InicioSesionAtributos {
    correo: string;
    contrasena: string;
}

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
                esAdmin: usuarioAdmin.esAdmin,
                planId: usuarioAdmin.plan,
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

    static async registrarUsuario(registroAtributos: RegistroAtributos) {
        const { correo, contrasena, plan } = registroAtributos;

        const existeEmail = await Usuario.findOne({ correo });

        if (existeEmail) {
            throw new SolicitudIncorrectaError('Email ya en uso');
        }

        const usuario = Usuario.build({ correo, contrasena, plan });
        await usuario.save();

        const usuarioJwt = jwt.sign(
            {
                id: usuario.id,
                correo: usuario.correo,
                esAdmin: usuario.esAdmin,
                planId: usuario.plan,
            }, 
            process.env.JWT_KEY!
        );

        return {
            usuario: usuario,
            token: usuarioJwt
        }
    }

    static async inicioSesion(atributos: InicioSesionAtributos) {
        const { correo, contrasena } = atributos;

        const usuarioExistente = await Usuario.findOne({ correo });
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
                correo: usuarioExistente.correo,
                planId: usuarioExistente.plan,
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