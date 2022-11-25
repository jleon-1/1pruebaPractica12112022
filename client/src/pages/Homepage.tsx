import React, { useEffect, useState } from "react";
import { Evento } from "../interfaces/Evento";
import apiUrls from "../api/axios-agent";
import {
   Button,
   Card,
   CardActions,
   CardContent,
   Container,
   Grid,
   Typography,
} from "@mui/material";
import ActividadCard from "../components/cards/ActividadCard";
import { useStore } from "../store/store";
import CrearActividadModal from "../components/CrearActividadModal";
import { history } from "..";

const Homepage = () => {
   const { modalStore  } = useStore();
   const [actividades, setActividades] = useState<any[]>([] as any);

   useEffect(() => {
      fetchEventos();
   }, []);

   const actualizarActividades = (actividadEditar: any) => {
      const actividadEditada = actividades.map(actividad => {
         if(actividad.id === actividadEditar.id) return actividadEditar
         return actividad
      })

      setActividades(actividadEditada)
   }

   const agregarActividad = (actividadAgregada: any) => {
      console.log(actividadAgregada);
      fetchEventos();
   }

   const fetchEventos = async () => {
      const actividadesApi = await apiUrls.Actividad.get();
      setActividades(actividadesApi);
   };

   return (
      <Container sx={{ py: 8 }} maxWidth="lg">
         <Container>
            <Button
               size="medium"
               variant="contained"
               onClick={() => modalStore.openModal(<CrearActividadModal agregar={agregarActividad}/>)}
               sx={{ marginBottom: 3 }}
            >
               Añadir Tarea
            </Button>
            <Button
               size="medium"
               variant="contained"
               onClick={() => history.push('/historial')}
               sx={{ marginBottom: 3, marginLeft: 2 }}
            >
               Ver Historial
            </Button>
         </Container>
         {/* End hero unit */}
         <Grid container spacing={4}>
            {actividades.map((actividad) => (
               <ActividadCard key={actividad.id} actividad={actividad} actualizar={actualizarActividades}/>
            ))}
         </Grid>
      </Container>
   );
};

export default Homepage;
