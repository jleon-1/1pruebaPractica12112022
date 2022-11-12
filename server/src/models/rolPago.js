const { Schema, model } = require('mongoose');

const RolPagoSchema = Schema({
    empleado: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    sueldo: {
        type: Number,
        required: true
    },
    ingreso: { 
        type: Number,
        default: 0, 
    },
    descuento: { 
        type: Number,
        default: 0, 
    },
    netoPagar: { 
        type: Number,
        required: true 
    },
    asistenteCreacion: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    asistenteModificacion: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    fechaCreacion: {
        type: Date,
        default: () => Date.now(), 
    },
    fechaModificacion: {
        type: Date,
        default:  () => Date.now()
    }
});


RolPagoSchema.methods.toJSON = function() {
    const { __v, estado, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'RolPago', RolPagoSchema );
