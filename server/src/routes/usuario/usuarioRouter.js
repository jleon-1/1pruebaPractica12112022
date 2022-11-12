const express = require('express')
const { check } = require('express-validator');

const { usuariosPost, usuariosGet } = require('../../controllers/usuario')

const userRouter = express.Router()

userRouter.get('/', usuariosGet)
userRouter.post('/', usuariosPost)

module.exports = userRouter