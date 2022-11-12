const express = require('express')

const userRouter = require("./usuario/usuarioRouter")
const authRouter = require("./auth/authRouter")
const rolPagoRouter = require("./rolPago/rolPagoRouter")

const app = express.Router();

app.use('/usuario', userRouter);
app.use('/auth', authRouter);
app.use('/rol-pago', rolPagoRouter);

module.exports = app