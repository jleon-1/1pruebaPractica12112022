import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useStore } from "../../store/store";
import TextInput from "../inputs/TextInput";
import apiUrls from "../../api/axios-agent";

interface ModalProps {
   isOpen: boolean;
   handleClose: () => void;
}

const style = {
   position: "absolute" as "absolute",
   top: "50%",
   left: "50%",
   transform: "translate(-50%, -50%)",
   width: 400,
   bgcolor: "background.paper",
   border: "2px solid #000",
   boxShadow: 24,
   p: 4,
};

const PerfilModal = ({ isOpen, handleClose }: ModalProps) => {
   const { authStore } = useStore();
   const { usuarioActual } = authStore;

   return (
      <Modal
         open={isOpen}
         onClose={handleClose}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
      >
         <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
               Agregar Perfil
            </Typography>
            <Formik
               initialValues={{
                  nombre: "",
                  fecha: "",
                  cantidadEntradas: 0,
                  precio: 0,
               }}
               onSubmit={(values) => {
                  const { nombre, fecha, cantidadEntradas, precio } = values;
                  apiUrls.Evento.crear({
                     nombre,
                     fecha,
                     organizador: usuarioActual!.usuario.id,
                     cantidadEntradas,
                     precio,
                  });
                  handleClose();
               }}
               validationSchema={Yup.object({
                  nombre: Yup.string().required("Se requiere un nombre de evento"),
                  fecha: Yup.string().required("Se requiere una fecha"),
                  cantidadEntradas: Yup.number().required(
                     "Se requiere una cantidad de entradas"
                  ),
                  precio: Yup.number().required("Se requiere un precio de las entradas"),
               })}
            >
               {({ handleSubmit, isSubmitting, isValid, dirty }) => (
                  <form onSubmit={handleSubmit} autoComplete="off">
                     <Box component="main" sx={{ mt: 5 }}>
                        <TextInput label="Nombre" name="nombre" />
                        <TextInput label="Fecha" name="fecha" value="02/04/2022" />
                        <TextInput label="Cantidad de entradas" name="cantidadEntradas" />
                        <TextInput label="Precio" name="precio" />
                        <Button
                           type="submit"
                           disabled={!isValid || !dirty || isSubmitting}
                           fullWidth
                           variant="contained"
                           sx={{ mt: 3, mb: 2 }}
                        >
                           Crear Evento
                        </Button>
                     </Box>
                  </form>
               )}
            </Formik>
         </Box>
      </Modal>
   );
};

export default PerfilModal;
