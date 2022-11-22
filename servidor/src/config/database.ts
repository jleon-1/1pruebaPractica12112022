import mongoose from 'mongoose';
import { seedData } from '../seed/seed-data';

require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL

mongoose.connection.once('open', () => {
    console.log('Conexion con mongodb hecha')
})

mongoose.connection.on('error', (err) => {
    console.error(err)
})

async function conectarMongo() {
    await mongoose.connect('mongodb://mongodb:27017/prueba-png')
    //await mongoose.connect(MONGO_URL!)
    await seedData()
}

async function desconectarMongo() {
    await mongoose.disconnect()
}

export {
    conectarMongo,
    desconectarMongo
}
