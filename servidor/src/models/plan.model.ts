import mongoose, {  Schema } from 'mongoose';

interface AtributosPlan {
    nombre: string;
    precio: number;
    cantidadPerfiles: number;
}

interface PlanModel extends mongoose.Model<PlanDoc> {
    build(attrs: AtributosPlan): PlanDoc;
}

export interface PlanDoc extends mongoose.Document {
    nombre: string;
    precio: number;
    cantidadPerfiles: number;
    status: boolean;
} 

const PlanSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del plan es obligatorio']
    },
    precio: {
        type: Number,
        required: [true, 'el precio del plan es obligatorio']
    },
    cantidadPerfiles: {
        type: Number,
        required: [true, 'la cantidad maxima de perfiles por usuario del plan es obligatorio']
    },
    descripcion: {
        type: String,
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
            delete ret.__v;
        }
    }
});


PlanSchema.statics.build = (attrs: AtributosPlan) => {
    return new Plan(attrs);
}

const Plan = mongoose.model<PlanDoc, PlanModel>('Plan', PlanSchema);

export { Plan };
