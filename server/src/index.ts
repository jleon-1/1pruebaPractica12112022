const json = require("body-parser");
const express = require("express");
const cors = require("cors");

const { conectarMongo } = require("./config/database");
import api from "./routes/api";
import { errorHandler } from './middleware/error-handler';

const app = express();
app.set("trust proxy", true);
app.use(express.json());
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

