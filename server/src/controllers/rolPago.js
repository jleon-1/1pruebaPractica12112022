const { response } = require('express');
var ObjectId = require('mongoose').Types.ObjectId;

const { Usuario } = require('../models');
const { RolPago } = require('../models');

const crearRolPago = async(req, res = response ) => {

    const { empleadoId, asistenteId, sueldo, ingreso, descuento, netoPagar } = req.body;

    const empleado = await Usuario.findById(empleadoId)
    const asistente = await Usuario.findById(asistenteId)

    // Generar la data a guardar
    const data = {
        empleado: empleado,
        sueldo,
        ingreso,
        descuento,
        netoPagar,
        asistenteCreacion: asistente,
    }

    const rolPago = new RolPago( data );

    // Guardar DB
    const nuevoRolPago = await rolPago.save();

    res.status(201).json( nuevoRolPago );

}

const buscarRolPagoPorEmpleado = async(req, res = response ) => {

    const { id } = req.params;
    var query = { empleado: new ObjectId(id) };

    const rolPagoEmpleados = await RolPago.find(query)
                            .populate('asistenteCreacion', 'nombre')
                            .populate('asistenteModificacion', 'nombre')

    res.json( rolPagoEmpleados );

}

module.exports = {
    crearRolPago,
    buscarRolPagoPorEmpleado
}