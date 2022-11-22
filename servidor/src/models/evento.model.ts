import mongoose, {  Schema } from 'mongoose';

interface AtributosEvento {
    nombre: string;
    fecha: Date;
    organizador: string;
    cantidadEntradas: string;
    precio: string;
}

interface EventoModel extends mongoose.Model<EventoDoc> {
    build(attrs: AtributosEvento): EventoDoc;
}

//interfaz que describe las propiedades que el documento de User tiene
export interface EventoDoc extends mongoose.Document {
    nombre: string;
    fecha: Date;
    organizador: string;
    cantidadEntradas: string;
    precio: string;
    estado: boolean;
    promocion: string;
} 

const EventoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha es obligatoria']
    },
    organizador: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El id del usuario es obligatorio']
    },
    cantidadEntradas: {
        type: Number,
        required: [true, 'la cantidad de entradas totales es obligatoria']
    },
    precio: {
        type: Number,
        required: [true, 'El precio de las entradas es obligatoria']
    },
    promocion: {
        type: Schema.Types.ObjectId,
        ref: 'Promocion',
    },
    estado: {
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
            delete ret.__v;
        }
    }
});

EventoSchema.statics.build = (attrs: AtributosEvento) => {
    return new Evento(attrs);
}

const Evento = mongoose.model<EventoDoc, EventoModel>('Evento', EventoSchema);

export { Evento };


