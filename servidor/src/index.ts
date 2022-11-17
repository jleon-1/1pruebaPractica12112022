import { json } from "body-parser";
import express from "express";
import cors from "cors";

import api from "./routes/api";
import { NoEncontradoError } from "./utils/errors/no-encontrado-error";
import { errorHandler } from "./middlewares/error-handler";
import { conectarMongo } from "./config/database";

const app = express();
app.use(json());
app.use(cors());
app.use(errorHandler);

app.use('/api', api);

app.all('*', async (req, res, next) => {
    next(new NoEncontradoError());
});


const start = async () => {
    await conectarMongo();

    app.listen(process.env.PORT, () => {
        console.log('Servidor en puerto 3000');
    })
}

start();

