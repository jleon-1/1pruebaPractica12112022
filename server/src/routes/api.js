const express = require('express')

const userRouter = require("./usuario/usuarioRouter")

const app = express.Router();

app.use('/usuario', userRouter);

module.exports = app