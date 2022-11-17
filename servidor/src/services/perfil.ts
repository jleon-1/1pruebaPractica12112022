import { Perfil } from "../models/perfil.model";
import { Usuario } from "../models/usuario.model";
import { SolicitudIncorrectaError } from "../utils/errors/solicitud-incorrecta-error";

export default class PerfilService{
    static async crearPerfil(idUsuario: string, nombre: string) {
        const existeUsuario = await Usuario.findOne({ idUsuario });

        if (!existeUsuario) {
            throw new SolicitudIncorrectaError('No existe usuario');
        }

        const perfil = Perfil.build({ nombre });
        await perfil.save();

        return perfil;
    }

    static async obtenerPerfilesdeUsuario(idUsuario: string) {
        const perfilesUsuario = await Perfil.findById(idUsuario);

        console.log(this.verificarPlan(idUsuario));
        

        return perfilesUsuario;
    }

    static async verificarPlan(idUsuario: string){
        const planUsuario = await Usuario.findById(idUsuario)
            .populate('plans');

        return planUsuario?.plan;
    }
}