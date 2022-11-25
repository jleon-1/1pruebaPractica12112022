import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import apiUrls from '../api/axios-agent';

const Historial = () => {
    const [historial, setHistorial] = useState<any[]>([] as any[]);

    useEffect(() => {
       fetchReporte();
    }, []);
 
    const fetchReporte = async () => {
       try {
          const response = await apiUrls.Actividad.historial();
          setHistorial(response);
       } catch (error) {
          console.error(error);
       }
    };

  return (
    <TableContainer>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
       <TableHead>
          <TableRow>
             <TableCell>Usuario</TableCell>
             <TableCell align="right">Actividad</TableCell>
             <TableCell align="right">Estado</TableCell>
             <TableCell align="right">Fecha de Modificacion</TableCell>
          </TableRow>
       </TableHead>
       <TableBody>
          {historial.map((actividad) => (
             <TableRow
                key={actividad.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
             >
                <TableCell component="th" scope="row">
                   {actividad.usuario.username}
                </TableCell>
                <TableCell align="right">
                   {actividad.actividad.nombre}
                </TableCell>
                <TableCell align="right">
                   {actividad.estado}
                </TableCell>
                <TableCell align="right">
                   {actividad.fechaModificion}
                </TableCell>
             </TableRow>
          ))}
       </TableBody>
    </Table>
 </TableContainer>
  )
}

export default Historial