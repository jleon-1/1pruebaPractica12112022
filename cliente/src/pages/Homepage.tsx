import React, { useEffect, useState } from "react";
import { Evento } from "../interfaces/Evento";
import apiUrls from "../api/axios-agent";
import { Button, Card, CardActions, CardContent, Container, Grid, Typography } from "@mui/material";

const Homepage = () => {
   const [eventos, setEventos] = useState<Evento[]>([] as Evento[]);

   useEffect(() => {
      fetchEventos();
   }, []);

   const fetchEventos = async () => {
      const eventosApi = await apiUrls.Evento.get();
      setEventos(eventosApi);
   };

   return (
      <Container sx={{ py: 8 }} maxWidth="md">
         {/* End hero unit */}
         <Grid container spacing={4}>
            {eventos.map((evento) => (
               <Grid item key={evento.id} xs={12} sm={6} md={4}>
                  <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                     <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                           {evento.nombre}
                        </Typography>
                        <Typography>
                           Organizado por: {evento.organizador.username}
                        </Typography>
                     </CardContent>
                     <CardActions>
                        <Button size="small">Comprar</Button>
                     </CardActions>
                  </Card>
               </Grid>
            ))}
         </Grid>
      </Container>
   );
};

export default Homepage;
