import React from 'react'
import { useStore } from '../store/store'

const HomePerfil = () => {
  const { usuarioStore } = useStore();
  const { perfilActual } = usuarioStore

  return (
    <h1>Bienvenido {perfilActual?.nombre}</h1>
  )
}

export default HomePerfil