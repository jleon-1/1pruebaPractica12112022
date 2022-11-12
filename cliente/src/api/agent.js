import axios, { AxiosError, AxiosResponse } from "axios";

import { history } from "..";

import { store } from '../store/store';

axios.defaults.baseURL = 'http://localhost:1000/api';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if(token) config.headers.Authorization = `${token}`;

    return config
})

const responseBody = (response) => response.data;

const requests = {
    get: (url) => axios.get(url).then(responseBody),
    post: (url, body = {}) => axios.post(url, body).then(responseBody),
    put: (url, body = {}) => axios.put(url, body).then(responseBody),
    delete: (url) => axios.delete(url).then(responseBody),
};

const Auth = {
    login: (credenciales) => requests.post('/auth/login', credenciales),
};

const RolPago = {
    crear: (rolCreado) => requests.post('/rol-pago', rolCreado),
    obtener: (id) => requests.get(`/rol-pago/${id}`),
}

const agent = {
    Auth,
    RolPago
};

export default agent;