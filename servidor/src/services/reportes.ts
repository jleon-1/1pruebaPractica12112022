import { ObjectId, Types } from "mongoose";
import { PerfilDoc } from "../models/perfil.model";
import { Usuario, UsuarioDoc } from "../models/usuario.model";
import PerfilService from "./perfil";

type UsuarioDocument = UsuarioDoc & { _id: ObjectId; }

interface UsuarioReporte extends UsuarioDocument{
    perfiles?: (PerfilDoc & {
        _id: Types.ObjectId;
    })[]
}

export default class ReportesService {
    static async obtenerReportesUsuarios() {
        const usuariosCreados = await Usuario.find<UsuarioReporte>({ esAdmin: false })
            .populate('plan');
        let perfiles: (PerfilDoc & { _id: Types.ObjectId; })[] = [];
  
        // for(const usuario of usuariosCreados) {
        //     perfiles = await PerfilService.obtenerPerfilesdeUsuario(usuario._id.toString())
        // }

        // console.log(perfiles);
        
        
        const usuariosConPerfiles = Promise.all(usuariosCreados.map(async (usuario: UsuarioReporte) => {
            perfiles = await PerfilService.obtenerPerfilesdeUsuario(usuario._id.toString());
            usuario.perfiles = perfiles
            return { usuario, perfiles }
        }));
        
        return usuariosConPerfiles;
    }   
}