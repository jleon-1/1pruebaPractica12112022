import React from "react";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";

const HomePage = () => {
   return (
      <Container component="main" maxWidth="sm">
         <Box
            sx={{
               marginTop: 8,
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
            }}
         >
            <Typography variant="h3" gutterBottom>
               Fortalecimiento Técnico
            </Typography>
         </Box>
      </Container>
   );
};

export default HomePage;
