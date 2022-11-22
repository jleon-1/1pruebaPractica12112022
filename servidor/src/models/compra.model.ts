import mongoose, {  Schema } from 'mongoose';

interface AtributosCompra {
    idEvento: string;
    cantidadEntradas: number;
    promocionAplicada?: string;
    pagoTotal: number;
}

interface CompraModel extends mongoose.Model<CompraDoc> {
    build(attrs: AtributosCompra): CompraDoc;
}

//interfaz que describe las propiedades que el documento de User tiene
export interface CompraDoc extends mongoose.Document {
    idEvento: string;
    cantidadEntradas: number;
    pagoTotal: number;
    promocionAplicada: string;
} 

const CompraSchema = new mongoose.Schema({
    idEvento: {
        type: Schema.Types.ObjectId,
        ref: 'Evento',
        required: [true, 'El id del evento es requerido']
    },
    cantidadEntradas: {
        type: Number,
        required: [true, 'La cantidad de entradas es requerida']
    },
    pagoTotal: {
        type: Number,
        required: [true, 'El pago total es requerida']
    },
    promocionAplicada: {
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

CompraSchema.statics.build = (attrs: AtributosCompra) => {
    return new Compra(attrs);
}

const Compra = mongoose.model<CompraDoc, CompraModel>('Compra', CompraSchema);

export { Compra };


