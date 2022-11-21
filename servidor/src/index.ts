import { json } from "body-parser";
import express from "express";
import cors from "cors";
import path from 'path'

import api from "./routes/api";
import { NoEncontradoError } from "./utils/errors/no-encontrado-error";
import { errorHandler } from "./middlewares/error-handler";
import { conectarMongo } from "./config/database";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(cors());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api', api);

app.get('/*', (req, res) => {//el la pagina / muestra la pagina de react desde index.html
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

app.use(errorHandler);

const start = async () => {
    await conectarMongo();

    app.listen(process.env.PORT, () => {
        console.log(`Servidor en puerto ${process.env.PORT}`);
    })
}

start();

