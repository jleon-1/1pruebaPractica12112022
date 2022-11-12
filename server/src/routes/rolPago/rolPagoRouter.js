const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos } = require('../../middlewares');

const { crearRolPago, buscarRolPagoPorEmpleado } = require('../../controllers/rolPago');

const { existeUsuarioPorId } = require('../../helpers/dbValidators');

const router = Router();

/**
 * {{url}}/api/categorias
 */


// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [ 
    validarJWT,
    check('asistenteId').custom( existeUsuarioPorId ),
    check('empleadoId').custom( existeUsuarioPorId ),
    validarCampos
], crearRolPago );
router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos,
], buscarRolPagoPorEmpleado );

module.exports = router;