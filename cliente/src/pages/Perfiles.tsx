import React, { useEffect, useState } from "react";
import { useStore } from "../store/store";
import {
   Box,
   Card,
   CardContent,
   Typography,
   CardActions,
   Button,
   Icon,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import PerfilModal from "../components/PerfilModal";
import { Perfil } from "../interfaces/Reporte";

const Perfiles = () => {
   const { usuarioStore, authStore } = useStore();
   const { perfilesUsuario } = usuarioStore;

   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   useEffect(() => {
      usuarioStore.obtenerPerfiles();
      console.log(perfilesUsuario?.length);
   }, [usuarioStore]);

   const eliminarPerfil = (idPerfil: string) => {
      console.log(authStore.usuario?.usuario.id);
      usuarioStore.eliminarPerfil(authStore.usuario?.usuario.id, idPerfil);
   };

   const elegirPerfil = (perfil: Perfil) => {
      usuarioStore.establecerPerfil(perfil);
   };

   return (
      <Box
         sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            minHeight: "100vh",
         }}
      >
         <PerfilModal isOpen={open} handleClose={handleClose} />
         {perfilesUsuario?.length !== 0 || perfilesUsuario !== null ? (
            <>
               {perfilesUsuario.map((perfil) => (
                  <Card sx={{ maxWidth: 300, mx: 1 }}>
                     <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                           {perfil.nombre}
                        </Typography>
                     </CardContent>
                     <CardActions>
                        <Button size="small" onClick={() => elegirPerfil(perfil)}>
                           Entrar
                        </Button>
                        <Button size="small" onClick={() => eliminarPerfil(perfil.id)}>
                           Eliminar
                        </Button>
                     </CardActions>
                  </Card>
               ))}
               <Box
                  sx={{
                     "& > :not(style)": {
                        m: 2,
                     },
                  }}
               >
                  <Button onClick={handleOpen} variant="outlined" sx={{ fontSize: 70 }}>
                     +
                  </Button>
               </Box>
            </>
         ) : (
            <>
               <Box
                  sx={{
                     "& > :not(style)": {
                        m: 2,
                     },
                  }}
               >
                  <Button onClick={handleOpen} variant="outlined" sx={{ fontSize: 70 }}>
                     +
                  </Button>
               </Box>
            </>
         )}
      </Box>
   );
};

export default observer(Perfiles);
