import mongoose, { Schema } from 'mongoose';
import { PasswordManager } from '../services/password-manager';

interface ActividadAtributos {
    nombre?: string;
    fechaFin?: Date;
    usuario?: string;
    estado?: string;
}

interface ActividadModel extends mongoose.Model<ActividadDoc> {
    build(attrs: ActividadAtributos): ActividadDoc;
}

//interfaz que describe las propiedades que el documento de User tiene
export interface ActividadDoc extends mongoose.Document {
    nombre: string;
    fechaFin: string;
    estado: string;
    usuario: string;
    fechaCreacion: string;
} 

const ActividadSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la actividad es obligatoria']
    },
    fechaFin: {
        type: Date,
        required: [true, 'Se requiere la fecha fin']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    estado: {
        type: String,
        default: 'EJECUTANDO',
        emun: ['EJECUTANDO', 'FINALIZADA', 'PAUSADA', 'CANCELADA'],
    },
    fechaCreacion: {
        type: Date,
        default: () => Date.now(),
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.contrasena;
            delete ret.__v;
        }
    }
});

ActividadSchema.statics.build = (attrs: ActividadAtributos) => {
    return new Actividad(attrs);
}

const Actividad = mongoose.model<ActividadDoc, ActividadModel>('Actividad', ActividadSchema);

export { Actividad };



