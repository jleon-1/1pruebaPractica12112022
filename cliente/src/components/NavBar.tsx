import { AppBar, Button, Link, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { useStore } from "../store/store";

const NavBar = () => {
   const { authStore } = useStore();
   const { usuarioActual: usuario, logout } = authStore;

   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
      logout()
   };

   return (
      <AppBar
         position="static"
         color="default"
         elevation={0}
         sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
         <Toolbar sx={{ flexWrap: "wrap" }}>
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
               <NavLink to="/" style={{ textDecoration: "none", color: "unset" }}>
                  PNG
               </NavLink>
            </Typography>
            {!usuario ? (
               <Button href="/login" variant="contained" sx={{ my: 1, mx: 1.5 }}>
                  Iniciar Sesión
               </Button>
            ) : (
               <>
                  <Button
                     id="basic-button"
                     aria-controls={open ? "basic-menu" : undefined}
                     aria-haspopup="true"
                     aria-expanded={open ? "true" : undefined}
                     onClick={handleClick}
                  >
                     {usuario.usuario.username}
                  </Button>
                  <Menu
                     id="basic-menu"
                     anchorEl={anchorEl}
                     open={open}
                     onClose={handleClose}
                     MenuListProps={{
                        "aria-labelledby": "basic-button",
                     }}
                  >
                     <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </Menu>
               </>
            )}
         </Toolbar>
      </AppBar>
   );
};

export default NavBar;
