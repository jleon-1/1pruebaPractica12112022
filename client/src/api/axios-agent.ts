import axios, { AxiosError, AxiosResponse } from "axios";
import { request } from "http";
import { toast } from "react-toastify";
import { Evento as EventoInterface, EventoForm } from "../interfaces/Evento";
import { Promocion as PromocionInterface, PromocionForm } from "../interfaces/Promocion";
import { UsuarioForm, UsuarioRegistro, UsuarioResponse } from "../interfaces/Usuario";
import { store } from "../store/store";

axios.defaults.baseURL = "http://localhost:1000/api";

axios.interceptors.request.use((config) => {
   const token = store.generalStore.token;
   if (token) config.headers!.Authorization = `${token}`;

   return config;
});

axios.interceptors.response.use(
   async (response) => {
      return response;
   },
   (error: AxiosError<any>) => {
      if(error.code === 'ERR_NETWORK'){
         toast.error('Error de conexion al servidor');
      }
      
      const { data, status, config } = error.response!;

      switch (status) {
         case 400:
            toast.error(data.errores[0].mensaje);
            break;
         case 401:
            toast.error("No autorizado");
            break;
         case 500:
            toast.error("Error de servidor");
            break;
      }
      return Promise.reject(error);
   }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
   get: <T>(url: string) => axios.get<T>(url).then(responseBody),
   post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
   put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
   delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Auth = {
   login: (usuario: UsuarioForm) =>
      requests.post<UsuarioResponse>("/auth/login", usuario),
   registrarse: (usuario: UsuarioRegistro) =>
      requests.post<UsuarioResponse>("/auth/registro", usuario),
};

const Actividad = {
   get: () => requests.get<any[]>("/actividad"),
   getFromUser: () => requests.get<any[]>("/actividad"),
   crear: (body: any) => requests.post<any>("/actividad/crear", body),
   pausar: (idActividad: string) =>
      requests.post<any>(`/actividad/pausar/${idActividad}`, {}),
   renaudar: (idActividad: string) =>
      requests.post<any>(`/actividad/renaudar/${idActividad}`, {}),
   cancelar: (idActividad: string) =>
      requests.post<any>(`/actividad/cancelar/${idActividad}`, {}),
   historial: () => requests.get<any>("/actividad/historial"),
};

const apiUrls = {
   Auth,
   Actividad,
};

export default apiUrls;
