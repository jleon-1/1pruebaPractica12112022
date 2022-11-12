const express = require('express')
const { check } = require('express-validator');

const { usuariosPost, usuariosGet } = require('../../controllers/usuario')
const {
    validarCampos,
    validarJWT,
    tieneRole
} = require('../../middlewares');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../../helpers/dbValidators');

const userRouter = express.Router()

userRouter.get('/', usuariosGet)
userRouter.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExiste ),
    check('rol', 'No es un rol válido').isIn(['RH_ROL','EMPLEADO_ROL']),
    validarCampos
] ,usuariosPost)

module.exports = userRouter