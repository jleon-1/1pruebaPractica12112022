import { Formik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, Grid, Link, Typography, Toolbar } from "@mui/material";
import { useStore } from "../store/store";
import { observer } from "mobx-react-lite";
import TextInput from "../components/inputs/TextInput";

const Registro = () => {
   const { authStore } = useStore();

   return (
      <>
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
                     username: "",
                     contrasena: "",
                     error: null
                  }}
                  onSubmit={(values) =>
                     authStore.registrarse(values.username, values.contrasena)
                  }
                  validationSchema={Yup.object({
                     username: Yup.string().trim().required('Se requiere de un correo'),
                     contrasena: Yup.string().required('Se requiere de una contraseña')
                  })}
               >
                  {({ handleSubmit, isSubmitting, isValid, dirty }) => (
                     <form onSubmit={handleSubmit} autoComplete="off">
                        <Box component='main' sx={{ mt: 5 }}>
                           <TextInput label="Username" name="username" />
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
