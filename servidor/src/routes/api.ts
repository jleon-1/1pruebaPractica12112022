import express from "express";
import { eventoRouter } from "./evento.router";
import { promocionRouter } from "./promociones.router";
import usuarioRouter from "./usuario.router";

const api = express.Router();

api.use("/auth", usuarioRouter);
api.use("/evento", eventoRouter);
api.use("/promocion", promocionRouter)

export default api;
