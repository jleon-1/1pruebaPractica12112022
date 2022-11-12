const express = require('express')
const cors = require('cors')
const path = require('path')

const api = require('./routes/api')

const app = express()

app.use(cors())

app.use(express.json())
//localiza los archivos estaticos
app.use(express.static(path.join(__dirname, '..', 'public')))

app.use('/api', api);

//el la pagina / muestra la pagina de react desde index.html
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = app