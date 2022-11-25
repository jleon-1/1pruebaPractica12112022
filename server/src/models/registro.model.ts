import mongoose, { Schema } from 'mongoose';
import { PasswordManager } from '../services/password-manager';

interface RegsitroAtributos {
    usuario?: string;
    actividad: string;
    estado: string;
    fechaModificion?: Date;
}

interface RegistroModel extends mongoose.Model<RegistroDoc> {
    build(attrs: RegsitroAtributos): RegistroDoc;
}

//interfaz que describe las propiedades que el documento de User tiene
export interface RegistroDoc extends mongoose.Document {
    usuario: string;
    actividad: string;
    estado: string;
    fechaModificion: Date;
} 

const RegistroSchema = new mongoose.Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    actividad: {
        type: Schema.Types.ObjectId,
        ref: 'Actividad'
    },
    estado: {
        type: String,
        default: 'EJECUTANDO',
        emun: ['EJECUTANDO', 'FINALIZADA', 'PAUSADA', 'CANCELADA'],
    },
    fechaModificion: {
        type: Date,
        default: new Date(),
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

RegistroSchema.statics.build = (attrs: RegsitroAtributos) => {
    return new Registro(attrs);
}

const Registro = mongoose.model<RegistroDoc, RegistroModel>('Registro', RegistroSchema);

export { Registro };



