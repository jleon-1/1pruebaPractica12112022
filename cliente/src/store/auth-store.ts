import { makeAutoObservable, runInAction } from "mobx";
import { history } from "..";
import { UsuarioRegistro, UsuarioForm, UsuarioResponse } from '../interfaces/Usuario';
import apiUrls from '../api/axios-agent';
import { store } from "./store";

export default class AuthStore {
    usuario: UsuarioResponse | null = null;
    usuarioRegistro: UsuarioRegistro | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get verificarSesion () {
        return !!this.usuario;
    }

    guardarCorreoYContra = async (values: UsuarioForm) => {
        try {
            runInAction(() => this.usuarioRegistro = values);
            history.push('/registro/planes');
        } catch (error) {
            throw error;
        }
    }

    registrarse = async (planId: string) => {
        try {
            const datosRegistro = this.usuarioRegistro;
            datosRegistro!.planId = planId;
            const user = await apiUrls.Auth.registrarse({...datosRegistro, planId} as UsuarioRegistro);
            store.generalStore.setToken(user.token);
            runInAction(() => {
                this.usuario = user
                this.usuarioRegistro = null
            });
            history.push('/perfiles')
        } catch (error) {
            
        }
    }

    login = async(usuario: UsuarioForm) => {
        try {
            const user = await apiUrls.Auth.login(usuario);
            store.generalStore.setToken(user.token);
            runInAction(() => this.usuario = user);
            history.push('/perfiles');
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        store.generalStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.usuario = null;
        history.push('/')
    }
}