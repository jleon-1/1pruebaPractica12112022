import { makeAutoObservable, runInAction } from 'mobx';
import { Perfil } from "../interfaces/Perfil";
import apiUrls from '../api/axios-agent';
import { history } from "..";

export class UsuarioStore {
    perfilesUsuario: Perfil[] = [];
    perfilActual: Perfil | undefined = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    obtenerPerfiles = async () => {
        try {
            const perfiles = await apiUrls.Perfiles.get();
            runInAction(() => {
                this.perfilesUsuario = perfiles;
            });
        } catch (error) {
            
        }
    }

    establecerPerfil = (perfil: Perfil) => {
        this.perfilActual = perfil;
        history.push('/home')
    }

    agregarPerfil = async(usuarioId: string | undefined, nombrePerfil: string ) => {
        try {
            const perfilAgregado = await apiUrls.Perfiles.post({usuarioId, nombrePerfil});
            runInAction(() => {
                this.perfilesUsuario.push(perfilAgregado);
            })
        } catch (error) {
            
        }
    }

    eliminarPerfil = async(usuarioId: string | undefined, perfilId: string ) => {
        try {
            const perfilesRestantes = await apiUrls.Perfiles.delete({usuarioId, perfilId});
            runInAction(() => {
                this.perfilesUsuario = perfilesRestantes;
            })
        } catch (error) {
            
        }
    }
}