import axios, { AxiosResponse } from "axios";
import { request } from "http";
import { Evento as EventoInterface, EventoForm } from '../interfaces/Evento';
import { UsuarioForm, UsuarioRegistro, UsuarioResponse } from "../interfaces/Usuario";
import { store } from "../store/store";

axios.defaults.baseURL = "http://localhost:1000/api";

axios.interceptors.request.use(config => {
   const token = store.generalStore.token;
   if(token) config.headers!.Authorization = `${token}`;

   return config
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
   get: <T>(url: string) => axios.get<T>(url).then(responseBody),
   post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
   put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
   delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Auth = {
   login: (usuario: UsuarioForm) => requests.post<UsuarioResponse>("auth/login", usuario),
   registrarse: (usuario: UsuarioRegistro) =>
      requests.post<UsuarioResponse>("/auth/registro", usuario),
};

const Evento = {
   get: () => requests.get<EventoInterface[]>("evento"),
   crear: (body: EventoForm) => requests.post<EventoInterface>("evento", body)
}


const apiUrls = {
   Auth,
   Evento
};

export default apiUrls;
