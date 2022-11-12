import React, { Fragment } from 'react'
import { useStore } from '../store/store'

const RolesPagoPage = () => {
    const { userStore } = useStore();

  return (
    <Fragment>
        {userStore.user.usuario.rol === 'RH_ROL'
        ?
        <h1>Es recursos humanos</h1>
        :
        <h1>Es empleado</h1>
        }
        
    </Fragment>
  )
}

export default RolesPagoPage