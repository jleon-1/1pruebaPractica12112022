import express from "express";
import actividadRouter from "./actividad.router";
import usuarioRouter from "./usuario.router";

const api = express.Router();

api.use("/auth", usuarioRouter);
api.use('/actividad', actividadRouter);

export default api;
