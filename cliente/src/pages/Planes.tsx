import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Plan } from "../interfaces/Plan";
import { useStore } from '../store/store';
import apiUrls from '../api/axios-agent';
import { observer } from "mobx-react-lite";


const Planes = () => {
   const { authStore: usuarioStore } = useStore();
   const [planes, setPlanes] = useState<Plan[]>([] as Plan[]);

   useEffect(() => {
      fetchPlanes()    
   }, []);

   const fetchPlanes = async() => {
      try {
         const response = await apiUrls.Planes.get();
         setPlanes(response)
      } catch (error) {
          console.error(error);
      }
   };

   return (
      <>
         <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
            <Typography
               component="h1"
               variant="h2"
               align="center"
               color="text.primary"
               gutterBottom
            >
               Planes
            </Typography>
         </Container>
         <Container maxWidth="md" component="main">
            <Grid container spacing={5} alignItems="flex-end">
               {planes.map((plan) => (
                  <Grid
                     item
                     key={plan.id}
                     xs={12}
                     sm={6}
                     md={4}
                  >
                     <Card>
                        <CardHeader
                           title={plan.nombre}
                           titleTypographyProps={{ align: "center" }}
                           subheaderTypographyProps={{ align: "center" }}
                           sx={{
                              backgroundColor: (theme) =>
                                 theme.palette.mode === "light"
                                    ? theme.palette.grey[200]
                                    : theme.palette.grey[700],
                           }}
                        />
                        <CardContent>
                           <Box
                              sx={{
                                 display: "flex",
                                 justifyContent: "center",
                                 alignItems: "baseline",
                                 mb: 2,
                              }}
                           >
                              <Typography
                                 component="h2"
                                 variant="h3"
                                 color="text.primary"
                              >
                                 ${plan.precio}
                              </Typography>
                              <Typography variant="h6" color="text.secondary">
                                 /mes
                              </Typography>
                           </Box>
                                 <Typography
                                    component="li"
                                    variant="subtitle1"
                                    align="center"
                                 >
                                    {plan.descripcion}
                                 </Typography>
                        </CardContent>
                        <CardActions>
                           <Button
                              fullWidth
                              variant="contained"
                              onClick={() => usuarioStore.registrarse(plan.id)}
                           >
                              Contratar
                           </Button>
                        </CardActions>
                     </Card>
                  </Grid>
               ))}
            </Grid>
         </Container>
      </>
   );
};

export default observer(Planes);
