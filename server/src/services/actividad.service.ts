import { Actividad } from "../models/actividad.model";
import moment from "moment";
import { SolicitudIncorrectaError } from "../errors/solicitud-incorrecta-error";
import { Registro } from "../models/registro.model";

export default class ActividadService {
   static async crearActividad(body: any, idUsuario: string) {
      const { nombre, fechaFin } = body;

      var nowDate = new Date();
      var fechaHoy =
         nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-" + nowDate.getDate();

      const actividades = await Actividad.find({
         fechaCreacion: { 
            $gte: fechaHoy 
        },
      });

      // if(actividades.length >= 5) {
      //   throw new SolicitudIncorrectaError('Ya se han creado mas de 5 actividades en el dia')
      // }

      const fecha = new Date(fechaFin);

      const actividad = Actividad.build({ nombre, fechaFin: fecha, usuario: idUsuario });
      await actividad.save();

      const registro = Registro.build({
         actividad: actividad.id,
         usuario: idUsuario,
         estado: "EJECUTANDO",
         fechaModificion: new Date(),
      });
      await registro.save();

      return { actividad };
   }

   static async pausarActividad(params: any) {
      const { id: actividadId } = params;

      const actividad = await Actividad.findOne({ _id: actividadId });
      if (!actividad) {
         throw new SolicitudIncorrectaError("No existe actividad");
      }

      if (actividad.estado !== "EJECUTANDO") {
         throw new SolicitudIncorrectaError("No es posible pausar actividad");
      }

      const fechaFinalizacion = new Date(actividad.fechaFin);

      if (fechaFinalizacion < new Date()) {
         throw new SolicitudIncorrectaError("La actividad ha finalizado");
      }

      const actualizacion = await Actividad.updateOne({
         _id: actividadId,
         estado: "PAUSADA",
      });

      const registro = Registro.build({
        usuario: actividad.usuario,
         actividad: actividad.id,
         estado: "PAUSADA",
         fechaModificion: new Date(),
      });
      await registro.save();

      return actualizacion.modifiedCount
         ? { mensaje: "Se ha pausado la actividad" }
         : "No actualizado";
   }

   static async renaudarActividad(params: any) {
      const { id: actividadId } = params;

      const actividad = await Actividad.findOne({ _id: actividadId });
      if (!actividad) {
         throw new SolicitudIncorrectaError("No existe actividad");
      }

      const fechaFinalizacion = new Date(actividad.fechaFin);

      if (fechaFinalizacion < new Date()) {
         throw new SolicitudIncorrectaError("La actividad ha finalizado");
      }

      if (actividad.estado !== "PAUSADA") {
         throw new SolicitudIncorrectaError("La actividad no esta en ejecucion");
      }

      const actualizacion = await Actividad.updateOne({
         _id: actividadId,
         estado: "EJECUTANDO",
      });

      const registro = Registro.build({
        usuario: actividad.usuario,
         actividad: actividad.id,
         estado: "EJECUTANDO",
         fechaModificion: new Date(),
      });
      await registro.save();

      return actualizacion.modifiedCount
         ? { mensaje: "Se ha renaudado la acitividad" }
         : "No actualizado";
   }

   static async cancelarActividad(params: any) {
      const { id: actividadId } = params;

      const actividad = await Actividad.findOne({ _id: actividadId });
      if (!actividad) {
         throw new SolicitudIncorrectaError("No existe actividad");
      }

      const fechaFinalizacion = new Date(actividad.fechaFin);

      if (fechaFinalizacion < new Date()) {
         throw new SolicitudIncorrectaError("La actividad ha finalizado");
      }

      if (actividad.estado === "FINALIZADA") {
         throw new SolicitudIncorrectaError("La actividad ya se encuentra finalizada");
      }

      const actualizacion = await Actividad.updateOne({
         _id: actividadId,
         estado: "CANCELADA",
      });

      const registro = Registro.build({
        usuario: actividad.usuario,
         actividad: actividad.id,
         estado: "CANCELADA",
         fechaModificion: new Date(),
      });
      await registro.save();

      return actualizacion.modifiedCount
         ? { mensaje: "Se ha cancelado la activadad" }
         : "No actualizado";
   }

   static async obtenerAcividades() {
      const actividades = await Actividad.find().populate("usuario");

      return actividades;
   }

   static async obtenerAcividadesUsuario(idUsuario: string) {
      const actividades = await Actividad.find({ usuario: idUsuario }).populate(
         "usuario"
      );

      return actividades;
   }

   static async obtenerHistorial(idUsuario: string) {
        const historial = await Registro.find({ usuario: idUsuario })
            .populate('usuario', 'username')
            .populate('actividad', 'nombre')

        return historial
   }
}
