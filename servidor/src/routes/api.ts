import express from "express";
import planRouter from "./plan.router";
import usuarioRouter from "./usuario.router";
import perfilRouter from './perfil.router';

const api = express.Router();

api.use("/usuario", usuarioRouter);
api.use("/plan", planRouter);
api.use("/perfil", perfilRouter);

export default api;
