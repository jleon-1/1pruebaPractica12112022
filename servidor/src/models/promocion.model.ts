import mongoose, {  Schema } from 'mongoose';

interface AtributosPromocion {
    fechaInicio: Date;
    fechaFinalizacion: Date;
    nombre: string;
    descuento: number;
    cantidadMin: number;
    esGeneral?: boolean;
    eventos?: string[];
}

interface PromocionModel extends mongoose.Model<PromocionDoc> {
    build(attrs: AtributosPromocion): PromocionDoc;
}

//interfaz que describe las propiedades que el documento de User tiene
export interface PromocionDoc extends mongoose.Document {
    fechaInicio: Date;
    fechaFinalizacion: Date;
    nombre: string;
    descuento?: number;
    cantidadMin: number;
    esGeneral?: boolean;
    eventos?: string[];
} 

const PromocionSchema = new mongoose.Schema({
    fechaInicio: {
        type: Date,
        required: [true, 'La fecha de inicio es requerida']
    },
    fechaFinalizacion: {
        type: Date,
        required: [true, 'La fecha fin es requerida']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    descuento: {
        type: Number,
        required: [true, 'El descuento es requerido']
    },
    cantidadMin: {
        type: Number,
        required: [true, 'La cantidad minima de entradas para aplicar el descuento es requerida']
    },
    esGeneral: {
        type: Boolean,
        default: false
    },
    eventos: [{ 
        type : Schema.Types.ObjectId, 
        ref: 'Evento' 
    }],
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

PromocionSchema.statics.build = (attrs: AtributosPromocion) => {
    return new Promocion(attrs);
}

const Promocion = mongoose.model<PromocionDoc, PromocionModel>('Promocion', PromocionSchema);

export { Promocion };


