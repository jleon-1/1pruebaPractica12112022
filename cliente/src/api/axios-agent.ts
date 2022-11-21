import axios, { AxiosResponse } from "axios";
import { Perfil, PerfilDelete, PerfilForm } from "../interfaces/Perfil";
import { Plan } from "../interfaces/Plan";
import { Reporte } from "../interfaces/Reporte";
import { UsuarioForm, UsuarioRegistro, UsuarioReporte, UsuarioResponse } from "../interfaces/Usuario";
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
   login: (usuario: UsuarioForm) => requests.post<UsuarioResponse>("usuario/login", usuario),
   registrarse: (usuario: UsuarioRegistro) =>
      requests.post<UsuarioResponse>("/usuario/registro", usuario),
};

const Planes = {
   get: () => requests.get<Plan[]>("/plan"),
};

const Perfiles = {
   get: () => requests.get<Perfil[]>("/perfil"),
   post: (perfil: PerfilForm) => requests.post<Perfil>("/perfil/agregar", perfil),
   delete: (perfil: PerfilDelete) => requests.put<Perfil[]>("/perfil/eliminar", perfil)
}

const Reportes = { 
   usuarios: () => requests.get<Reporte[]>("/reportes")
}

const apiUrls = {
   Auth,
   Planes,
   Perfiles,
   Reportes
};

export default apiUrls;
