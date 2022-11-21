import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useStore } from '../store/store';
import TextInput from "./form/TextInput";
import AuthStore from '../store/auth-store';

interface ModalProps {
    isOpen: boolean;
    handleClose: () => void
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const PerfilModal = ({ isOpen, handleClose }: ModalProps) => {
    const { usuarioStore, authStore } = useStore();
    const { usuario } = authStore

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
               }}
               onSubmit={(values) =>{
                   usuarioStore.agregarPerfil(usuario?.usuario.id, values.nombre)
                   handleClose();
               }
               }
               validationSchema={Yup.object({
                  nombre: Yup.string().required('Se requiere un nombre de perfil'),
               })}
            >
               {({ handleSubmit, isSubmitting, isValid, dirty }) => (
                  <form onSubmit={handleSubmit} autoComplete="off">
                     <Box component='main' sx={{ mt: 5 }}>
                        <TextInput label="Nombre de perfil" name="nombre" />
                        <Button 
                           type="submit"
                           disabled={!isValid || !dirty || isSubmitting}
                           fullWidth
                           variant="contained"
                           sx={{ mt: 3, mb: 2 }}
                        >
                           Agregar
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
