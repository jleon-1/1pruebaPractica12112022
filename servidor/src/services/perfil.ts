import { PlanDoc } from './../models/plan.model';
import { PopulatedDoc } from "mongoose";
import { Perfil } from "../models/perfil.model";
import { Usuario } from "../models/usuario.model";
import { SolicitudIncorrectaError } from "../utils/errors/solicitud-incorrecta-error";

export interface AgregarPerfilAtributos {
    usuarioId: string;
    nombrePerfil: string;
}

export interface EliminarPerfilAtributos {
    usuarioId: string;
    perfilId: string;
}

interface Plan {
    cantidadPerfiles: number;
}

export default class PerfilService{
    static async agregarPerfilUsuario(agregarPerfilatributos: AgregarPerfilAtributos) {
        const { usuarioId, nombrePerfil } = agregarPerfilatributos

        const existeUsuario = await Usuario.findOne({ _id: usuarioId })
            .populate<{ plan: Plan }>('plan').exec();

        if (!existeUsuario) {
            throw new SolicitudIncorrectaError('No existe usuario');
        }
        if(!existeUsuario.plan) {
            throw new SolicitudIncorrectaError('No es posible agregar plan a usuario');
        }

        const perfilesUsuario = await Perfil.find({ usuario: usuarioId });
        if(perfilesUsuario.length >= 5) {
            throw new SolicitudIncorrectaError('No es posible agregar mas perfiles a usuario');
        } 

        const perfil = Perfil.build({ nombre: nombrePerfil, usuario: usuarioId });
        await perfil.save();

        return perfil;
    }

    static async eliminarPerfilUsuario(eliminarPerfilAtributos: EliminarPerfilAtributos) {
        const { usuarioId, perfilId } = eliminarPerfilAtributos

        const existeUsuario = await Usuario.findOne({ _id: usuarioId })
            .populate<{ plan: Plan }>('plan').exec();

        if (!existeUsuario) {
            throw new SolicitudIncorrectaError('No existe usuario');
        }
        if(!existeUsuario.plan) {
            throw new SolicitudIncorrectaError('El usuario no posee un plan');
        }

        await Perfil.findOneAndDelete({ _id: perfilId });

        return this.obtenerPerfilesdeUsuario(usuarioId);
    }

    static async obtenerPerfilesdeUsuario(idUsuario: string) {
        const perfilesUsuario = await Perfil.find({ usuario: idUsuario});
        
        return perfilesUsuario;
    }

    static async verificarPlan(idUsuario: string){
        const planUsuario = await Usuario.findById(idUsuario)
            .populate('plan').exec();

        if(!planUsuario!.plan) {
            throw new SolicitudIncorrectaError('El usuario no tiene un plan');
        }

        return planUsuario?.plan;
    }
}