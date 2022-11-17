import { Plan } from "../models/plan.model";
import { SolicitudIncorrectaError } from "../utils/errors/solicitud-incorrecta-error";

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
}