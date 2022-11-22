import React from "react";
import { Box, Button, Container, Grid, Link, Typography } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { useStore } from "../store/store";
import TextInput from "../components/inputs/TextInput";

const Login = () => {
   const { authStore } = useStore();

   return (
      <Container component="h1" maxWidth="xs">
         <Box
            sx={{
               marginTop: 15,
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
            }}
         >
            <Typography component="h1" variant="h3">
               Iniciar Sesión
            </Typography>
            <Formik
               initialValues={{
                  username: "",
                  contrasena: "",
                  error: null,
               }}
               onSubmit={(values) => authStore.login(values)}
               validationSchema={Yup.object({
                  username: Yup.string().trim().required("Se requiere de una contraseña"),
                  contrasena: Yup.string().required("Se requiere de una contraseña"),
               })}
            >
               {({ handleSubmit, isSubmitting, isValid, dirty }) => (
                  <form onSubmit={handleSubmit} autoComplete="off">
                     <Box component="main" sx={{ mt: 5 }}>
                        <TextInput label="Username" name="username" />
                        <TextInput label="Contraseña" name="contrasena" type="password" />
                        <Button
                           type="submit"
                           disabled={!isValid || !dirty || isSubmitting}
                           fullWidth
                           variant="contained"
                           sx={{ mt: 3, mb: 2 }}
                        >
                           Iniciar Sesión
                        </Button>
                        <Grid container direction="row-reverse">
                           <Grid item>
                              <Link href="/registro" variant="body2">
                                 No tienes una cuenta? Regístrate
                              </Link>
                           </Grid>
                        </Grid>
                     </Box>
                  </form>
               )}
            </Formik>
         </Box>
      </Container>
   );
};

export default Login;
