import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import { Container } from '@mui/material';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Planes from './pages/Planes';
import Perfiles from './pages/Perfiles';
import ReportesPage from './pages/Reporte';
import RequireAuth from './components/RequireAuth';
import HomePerfil from './pages/HomePerfil';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login /> }/>
      <Route path='/registro' element={<Registro /> }/>
      <Route path='/registro/planes' element={<Planes /> }/>
      <Route path='/perfiles' element={<RequireAuth><Perfiles /></RequireAuth> }/>
      <Route path='/reporte' element={<ReportesPage /> }/>
      <Route element={
        <>
          <NavBar /><Outlet />
        </>
      }>
        <Route path='/' element={<HomePage />}/>
        <Route path='/home' element={<RequireAuth><HomePerfil /></RequireAuth>}/>
      </Route>
    </Routes>
  );
}

export default App;
