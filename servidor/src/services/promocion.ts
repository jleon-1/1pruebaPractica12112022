import { Promocion } from "../models/promocion.model";
import { SolicitudIncorrectaError } from "../utils/errors/solicitud-incorrecta-error";
import moment from 'moment'
import { Evento } from "../models/evento.model";

export interface CreacionPromocion {
   nombre: string;
   descuento: number;
   fechaInicio: string;
   fechaFinalizacion: string;
   cantidadMin: number;
   esGeneral?: boolean
}

export interface AsignarEvento {
    idEvento: string;
    idPromocion: string;
}

export default class PromocionService {
   static async crearPromocion(promocionAtributos: CreacionPromocion) {
      let { nombre, descuento, fechaInicio, fechaFinalizacion, cantidadMin, esGeneral } =
         promocionAtributos;

      const existePromocion = await Promocion.findOne({ nombre });

      if (existePromocion)
         throw new SolicitudIncorrectaError("Nombre de la promocion ya tomado");

      if (!this.isValidDate(fechaInicio) || !this.isValidDate(fechaFinalizacion))
         throw new SolicitudIncorrectaError(
            "Fechas invalidas, formato de fecha es dd/mm/YYYY"
         );

      const fechaInicioFormateada = new Date(moment(fechaInicio).format('mm/dd/YYYY'));
      const fechaFinFormateada = new Date(moment(fechaFinalizacion).format('mm/dd/YYYY'));

      if (fechaFinFormateada < fechaInicioFormateada){
          throw new SolicitudIncorrectaError(
             "la fecha fin no puede ser mayor que la fecha inicio"
          );
      }

      const promocioncreada = await Promocion.build({
         nombre,
         descuento,
         cantidadMin,
         fechaInicio: fechaInicioFormateada,
         fechaFinalizacion: fechaFinFormateada,
         esGeneral
      });
      await promocioncreada.save();

      return promocioncreada;
   }

   static async obtenerPromociones() {
      const query = { estado: true };
      const promociones = Promocion.find(query).populate('eventos');

      return promociones;
   }

   static async asignarEvento(promocionAtributos: AsignarEvento) {
    const { idPromocion, idEvento } = promocionAtributos

    const existeEvento = await Evento.find({ _id: idEvento });
    if (!existeEvento)
    throw new SolicitudIncorrectaError("No existe evento");

    const eventoRepetido = await Evento.find({ promocion: idPromocion });
    if (!eventoRepetido)
    throw new SolicitudIncorrectaError("El evento ya cuenta con la promocion");

    const existePromocion = await Promocion.find({ _id: idPromocion });
    if (!existePromocion)
    throw new SolicitudIncorrectaError("No existe promocion");

    const promocionActualizada = await Promocion.updateOne(
            { _id: idPromocion }, 
            { $push: { eventos: idEvento } },

        );

    await Evento.updateOne({ _id: idEvento }, { promocion: idPromocion })

    return promocionActualizada.modifiedCount ? { mensaje: "actualizado" } : "No actualizado"
   }

   static isValidDate(dateString: string) {
      if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;

      var parts = dateString.split("/");
      var day = parseInt(parts[0], 10);
      var month = parseInt(parts[1], 10);
      var year = parseInt(parts[2], 10);

      if (year < 1000 || year > 3000 || month == 0 || month > 12) return false;

      var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      // Adjust for leap years
      if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) monthLength[1] = 29;

      // Check the range of the day
      return day > 0 && day <= monthLength[month - 1];
   }
}
