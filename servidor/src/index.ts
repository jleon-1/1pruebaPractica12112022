import { json } from "body-parser";
import express from "express";
import cors from "cors";
import path from 'path'

import api from "./routes/api";
import { NoEncontradoError } from "./utils/errors/no-encontrado-error";
import { errorHandler } from './middleware/error-handler';
import { conectarMongo } from "./config/database";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(cors());

app.use('/api', api);

app.use(errorHandler);

const start = async () => {
    await conectarMongo();
    
    app.listen(1000, () => {
        console.log(`Servidor en puerto 1000`);
    })
}

start();

