import { Formik } from "formik";
import * as Yup from "yup";
import { AppBar, Box, Button, Container, Grid, Link, Typography, Toolbar } from "@mui/material";
import { useStore } from "../store/store";
import TextInput from "../components/form/TextInput";
import { observer } from "mobx-react-lite";

const Registro = () => {
   const { authStore } = useStore();

   return (
      <>
         <AppBar
            position="static"
            color="default"
            elevation={0}
         >
            <Toolbar sx={{ flexWrap: "wrap" }}>
               <Button href="/reporte" variant="contained" sx={{ my: 1, mx: 1.5 }}>
                  Reporte
               </Button>
            </Toolbar>
         </AppBar>
         <Container component="h1" maxWidth="xs">
            <Box
               sx={{
                  marginTop: 6,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
               }}
            >
               <Typography component="h1" variant="h3">
                  Registrarse
               </Typography>
               <Formik
                  initialValues={{
                     correo: "",
                     contrasena: "",
                     error: null,
                  }}
                  onSubmit={(values) =>
                     authStore.guardarCorreoYContra(values)
                  }
                  validationSchema={Yup.object({
                     correo: Yup.string().email('Debe ser un correo valido').required('Se requiere de un correo'),
                     contrasena: Yup.string().required('Se requiere de una contraseña')
                  })}
               >
                  {({ handleSubmit, isSubmitting, isValid, dirty }) => (
                     <form onSubmit={handleSubmit} autoComplete="off">
                        <Box component='main' sx={{ mt: 5 }}>
                           <TextInput label="Correo electrónico" name="correo" />
                           <TextInput label="Contraseña" name="contrasena" type="password" />
                           <Button 
                              type="submit"
                              disabled={!isValid || !dirty || isSubmitting}
                              fullWidth
                              variant="contained"
                              sx={{ mt: 3, mb: 2 }}
                           >
                              Registrarse
                           </Button >
                           <Grid container direction="row-reverse">
                              <Grid item>
                                 <Link href="/login" variant="body2">
                                    {"Iniciar Sesión con cuenta existente"}
                                 </Link>
                              </Grid>
                           </Grid>
                        </Box>
                     </form>
                  )}
               </Formik>
            </Box>
         </Container>
      </>
   );
};

export default observer(Registro);
