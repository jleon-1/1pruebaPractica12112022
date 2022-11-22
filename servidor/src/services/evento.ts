import { Evento } from "../models/evento.model";
import { SolicitudIncorrectaError } from "../utils/errors/solicitud-incorrecta-error";

export interface CreacionEvento {
   nombre: string;
   fecha: string;
   organizador: string;
   cantidadEntradas: string;
   precio: string;
}

export default class EventoService {
   static async crearEvento(eventoAtributos: CreacionEvento) {
      const { nombre, fecha, organizador, cantidadEntradas, precio } = eventoAtributos;

      const existeEvento = await Evento.findOne({ nombre });

      if (existeEvento) throw new SolicitudIncorrectaError("Nombre de evento ya tomado");

      if (!this.isValidDate(fecha))
         throw new SolicitudIncorrectaError(
            "Fecha invalidad, formato de fecha es dd/mm/YYYY"
         );

      const fechaFormateada = new Date(fecha);

      const eventoCreado = await Evento.build({
         nombre,
         fecha: fechaFormateada,
         organizador,
         cantidadEntradas,
         precio,
      });
      await eventoCreado.save();

      return eventoCreado;
   }

   static async obtenerEventos() {
        const query = { estado: true }
        const eventos = Evento.find(query).populate('organizador').populate('promocion')

        return eventos;
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
