import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useStore } from "../store/store";
import TextInput from "./inputs/TextInput";
import apiUrls from "../api/axios-agent";
import { observer } from "mobx-react-lite";
import moment from 'moment';



const CrearActividadModal = ({ agregar }: {agregar: any} ) => {
   const crearActividadLocalmente = (actividad: any) => {
      agregar(actividad)
   }

   return (
      <>
         <Typography id="modal-modal-title" variant="h6" component="h2">
            Agregar Tarea
         </Typography>
         <Formik
            initialValues={{
               nombre: "",
               fechaFin: new Date(),
            }}
            onSubmit={async (values) => {
               const { nombre, fechaFin } = values;
               const actividadCreada = await apiUrls.Actividad.crear({
                  nombre,
                  fechaFin,
               });
               crearActividadLocalmente(actividadCreada)
            }}
            validationSchema={Yup.object({
               nombre: Yup.string().required("Se requiere un nombre de evento"),
               fechaFin: Yup.string().required("Se requiere una fecha"),
            })}
         >
            {({ handleSubmit, isSubmitting, isValid, dirty }) => (
               <form onSubmit={handleSubmit} autoComplete="off">
                  <Box component="main" sx={{ mt: 5 }}>
                     <TextInput label="Nombre" name="nombre" />
                     <TextInput label="Fecha" name="fechaFin" type="datetime-local" defaultValue={moment()}/>
                     <Button
                        type="submit"
                        disabled={!isValid || !dirty || isSubmitting}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                     >
                        Crear Tarea
                     </Button>
                  </Box>
               </form>
            )}
         </Formik>
      </>
   );
};

export default observer(CrearActividadModal);
