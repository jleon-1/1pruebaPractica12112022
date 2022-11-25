import { makeAutoObservable, runInAction } from "mobx";
import jwt_decode from 'jwt-decode'
import { history } from "..";
import { UsuarioForm, UsuarioResponse } from '../interfaces/Usuario';
import apiUrls from '../api/axios-agent';
import { store } from "./store";

export default class AuthStore {
    usuarioActual: UsuarioResponse | null = null;
    constructor() {
        makeAutoObservable(this);
    }

    get verificarSesion () {   
        return !!this.usuarioActual;
    }

    registrarse = async (username: string, contrasena: string) => {
        try {
            const user = await apiUrls.Auth.registrarse({username, contrasena});
            store.generalStore.setToken(user.token);
            runInAction(() => {
                this.usuarioActual = user
            });
            history.push('/homepage')
        } catch (error) {
            console.log(error)
        }
    }

    login = async(usuario: UsuarioForm) => {
        try {
            const user = await apiUrls.Auth.login(usuario);
            store.generalStore.setToken(user.token);
            runInAction(() => this.usuarioActual = user);
            history.push('/homepage')
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        store.generalStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.usuarioActual = null;
        history.push('/login')
    }

    getUsuario = () => {
        const token = window.localStorage.getItem('jwt');
        const data = jwt_decode(token!) as any;

        this.usuarioActual = {
            usuario: {
                id: data.id,
                username: data.username
            },
            token: token!,
        }
        
    }
}