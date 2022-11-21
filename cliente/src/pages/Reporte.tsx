import {
   AppBar,
   Toolbar,
   Typography,
   Button,
   TableContainer,
   Table,
   TableHead,
   TableRow,
   TableCell,
   TableBody,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import apiUrls from "../api/axios-agent";
import NavBar from "../components/NavBar";
import { Reporte } from "../interfaces/Reporte";
import { UsuarioReporte } from "../interfaces/Usuario";

const ReportesPage = () => {
   const [reporteUsuario, setReporte] = useState<Reporte[]>([] as Reporte[]);

   useEffect(() => {
      fetchReporte();
   }, []);

   const fetchReporte = async () => {
      try {
         const response = await apiUrls.Reportes.usuarios();
         setReporte(response);
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <>
         <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
         >
            <Toolbar sx={{ flexWrap: "wrap" }}>
               <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                  <NavLink to="/" style={{ textDecoration: "none", color: "unset" }}>
                     Fortalecimiento Tecnico
                  </NavLink>
               </Typography>
               <Button href="/login" variant="contained" sx={{ my: 1, mx: 1.5 }}>
                  Iniciar Sesión
               </Button>
            </Toolbar>
         </AppBar>
         <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead>
                  <TableRow>
                     <TableCell>Usuario</TableCell>
                     <TableCell align="right">Perfiles</TableCell>
                     <TableCell align="right">Fecha de Creación</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {reporteUsuario.map((reporte) => (
                     <TableRow
                        key={reporte.usuario.id}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                     >
                        <TableCell component="th" scope="row">
                           {reporte.usuario.correo}
                        </TableCell>
                        <TableCell align="right">
                           {reporte.perfiles.map((perfil) => `${perfil.nombre}, `)}
                        </TableCell>
                        <TableCell align="right">
                           {reporte.usuario.fechaCreacion.toString()}
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </>
   );
};

export default ReportesPage;
