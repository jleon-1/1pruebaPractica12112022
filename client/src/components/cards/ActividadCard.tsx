import React from "react";
import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { useStore } from "../../store/store";
import { observer } from "mobx-react-lite";
import apiUrls from "../../api/axios-agent";

const ActividadCard = ({ actividad, actualizar }: { actividad: any, actualizar: any }) => {
   const comprobarColor = () => {
      if (actividad.estado === "EJECUTANDO") return "green";
      if (actividad.estado === "PAUSADA") return "blue";
      if (actividad.estado === "FINALIZADA") return "red";
      if (actividad.estado === "CANCELADA") return "red";
   };

   const actualizarEstado = (estado: string) => {
      actividad.estado = estado;

      actualizar(actividad)
   }

   const validacion = new Date(actividad.fechaFin) > new Date();

   return (
      <Grid item xs={12} sm={6} md={4}>
         <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flexGrow: 1 }}>
               <Typography gutterBottom variant="h5" component="h2">
                  {actividad.nombre}
               </Typography>
               <Typography color={validacion ? comprobarColor() : "red"}>
                  {validacion ? actividad.estado : "FINALIZADA"}
               </Typography>
               <Typography>Creado en: {actividad.fechaCreacion.split("T")[0]}</Typography>
               <Typography>Finaliza: {actividad.fechaFin.split("T")[0]}</Typography>
            </CardContent>
            <CardActions>
               {actividad.estado === "EJECUTANDO" && (
                  <Button
                     size="small"
                     disabled={
                        actividad.estado === "CANCELADA" ||
                        actividad.estado === "FINALIZADA" || !validacion
                     }
                     onClick={() => {
                        apiUrls.Actividad.pausar(actividad.id)
                        actualizarEstado('PAUSADA')
                     }}
                  >
                     Pausar
                  </Button>
               )}
               {actividad.estado === "PAUSADA" && (
                  <Button
                     size="small"
                     disabled={
                        actividad.estado === "CANCELADA" ||
                        actividad.estado === "FINALIZADA" || !validacion
                     }
                     onClick={() => {
                        apiUrls.Actividad.renaudar(actividad.id)
                        actualizarEstado('EJECUTANDO')
                     }}
                  >
                     Ejecutar
                  </Button>
               )}
               <Button
                  size="small"
                  disabled={
                     actividad.estado === "CANCELADA" || actividad.estado === "FINALIZADA" || !validacion
                  }
                  onClick={() => {
                     apiUrls.Actividad.cancelar(actividad.id)
                     actualizarEstado('CANCELADA')
                  }}
               >
                  Cancelar
               </Button>
            </CardActions>
         </Card>
      </Grid>
   );
};

export default observer(ActividadCard);
