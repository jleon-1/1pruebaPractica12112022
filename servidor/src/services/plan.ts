import { Plan } from "../models/plan.model";
import { Usuario } from "../models/usuario.model";
import { SolicitudIncorrectaError } from "../utils/errors/solicitud-incorrecta-error";

export interface ContratarPlanAtributos {
    usuarioId: string;
    planId: string;
}

export default class PlanService{
    static async crearPlan(nombre: string, precio: number, cantidadPerfiles: number) {
        const existePlan = await Plan.findOne({ nombre });

        if (existePlan) {
            throw new SolicitudIncorrectaError('Nombre de plan ya en uso');
        }

        const plan = Plan.build({ nombre, precio, cantidadPerfiles });
        await plan.save();

        return {
            plan
        }
    }

    static async obtenerPlanes() {
        const query = { status: true }

        const planes = Plan.find(query)

        return planes
    }

    static async contratarPlan(atributos: ContratarPlanAtributos) {
        const { usuarioId, planId } = atributos

        const usuarioExistente = await Usuario.findOneAndUpdate({_id: usuarioId}, { plan: planId });
        if(!usuarioExistente) {
            throw new SolicitudIncorrectaError('No existe el usuario');
        }

        return {
            mensaje: 'Plan contratado con exito'
        }
    }
}