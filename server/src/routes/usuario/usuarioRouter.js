const express = require('express')
const { check } = require('express-validator');

const {usuariosGet, getEmpleados, crearAsistente, crearEmpleado } = require('../../controllers/usuario')
const {
    validarCampos,
} = require('../../middlewares');
const { emailExiste } = require('../../helpers/dbValidators');

const userRouter = express.Router()

userRouter.get('/', usuariosGet)
userRouter.get('/empleado', getEmpleados)
userRouter.post('/asistente',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExiste ),
    validarCampos
] , crearAsistente)
userRouter.post('/empleado',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').isDecimal(),
    check('sueldo').isDecimal(),
    check('prestamo').custom( emailExiste ),
    validarCampos
] , crearAsistente)

module.exports = userRouter