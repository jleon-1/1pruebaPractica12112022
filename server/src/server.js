const http = require('http')
require('dotenv').config()

const app = require('./app')
const { mongoConnect } = require('./services/mongo')


const PORT = process.env.PORT || 1000

const server = http.createServer(app)

async function startServer(){
    await mongoConnect();

    server.listen(PORT, () => {
        console.log('puerto en', PORT)
    })
} 

startServer()