import mongoose, {  Schema } from 'mongoose';
import { PasswordManager } from '../services/password-manager';

interface AtributosUsuario {
    username: string;
    contrasena: string;
}

interface UsuarioModel extends mongoose.Model<UsuarioDoc> {
    build(attrs: AtributosUsuario): UsuarioDoc;
}

//interfaz que describe las propiedades que el documento de User tiene
export interface UsuarioDoc extends mongoose.Document {
    username: string;
    contrasena: string;
    estado: string
} 

const UsuarioSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    contrasena: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    estado: {
        type: Boolean,
        default: true
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
            delete ret.contrasena;
            delete ret.__v;
        }
    }
});

UsuarioSchema.pre('save', async function (done) {
    //solo se aplica hash si el password ha sido modificado
    if(this.isModified('contrasena')) {
        const hashed = await PasswordManager.toHash(this.get('contrasena'));
        this.set('contrasena', hashed);
    }
    done();
});

UsuarioSchema.statics.build = (attrs: AtributosUsuario) => {
    return new Usuario(attrs);
}

const Usuario = mongoose.model<UsuarioDoc, UsuarioModel>('Usuario', UsuarioSchema);

export { Usuario };


