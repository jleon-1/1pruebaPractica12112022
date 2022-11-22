import { Button, Container, Typography } from '@mui/material'
import React, { useState } from 'react'
import CrearEventoModal from '../components/modals/CrearEventoModal'

const AdminHome = () => {
    const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

  return (
    
    <Container sx={{ py: 8 }} maxWidth="md">
        <CrearEventoModal isOpen={open} handleClose={handleClose}/>
         <div>
            <Typography>
               Crear Evento 
            </Typography>
            <Button onClick={handleOpen}>
                Crear
            </Button>
         </div>
      </Container>
  )
}

export default AdminHome