import { makeAutoObservable, reaction } from "mobx";

export default class GeneralStore {
    token: string | null = window.localStorage.getItem('jwt');
    error: any = null;

    constructor() {
        makeAutoObservable(this);
        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token)
                } else {
                    window.localStorage.removeItem('jwt')
                }
            }
        )
    }

    setToken = (token: string | null) => {
        this.token = token;
    } 

    setServerError = (error: any) => {
        console.log(error); 
        this.error = error
    }
}