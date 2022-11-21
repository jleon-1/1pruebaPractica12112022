import mongoose, {  Schema } from 'mongoose';

interface AtributosPerfil {
    nombre: string;
    usuario: string;
    imagen?: string
}

interface PerfilModel extends mongoose.Model<PerfilDoc> {
    build(attrs: AtributosPerfil): PerfilDoc;
}

export interface PerfilDoc extends mongoose.Document {
    nombre: string;
    imagen: string;
    usuario: any;
    status: boolean;
} 

const PerfilSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del perfil es obligatorio']
    },
    imagen: {
        type: String,
        default: null
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    status: {
        type: Boolean,
        default: true
    },
    creadoPor: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    modificadoPor: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    fechaCreacion: {
        type: Date,
        default: () => Date.now(),
    },
    fechaModificacion: {
        type: Date,
        default: () => Date.now(),
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});


PerfilSchema.statics.build = (attrs: AtributosPerfil) => {
    return new Perfil(attrs);
}

const Perfil = mongoose.model<PerfilDoc, PerfilModel>('Perfil', PerfilSchema);

export { Perfil };

