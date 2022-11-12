import { makeAutoObservable, runInAction } from "mobx";
import agent from '../api/agent';
import { store } from "./store";
import { history } from "..";

export default class UserStore {
    user = null;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn () {
        return !!this.user;
    }

    login = async (creds) => {
        try {
            const user = await agent.Auth.login(creds);
            console.log(user);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            history.push('/roles-de-pago');
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        history.push('/')
    }
}