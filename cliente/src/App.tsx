import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Outlet, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Registro from './pages/Registro';
import NavBar from './components/NavBar';
import Homepage from './pages/Homepage';
import AdminHome from './pages/AdminHome';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login /> }/>
      <Route path='/registro' element={<Registro /> }/>
      <Route element={
        <>
          <NavBar /><Outlet />
        </>
      }>
        <Route path='/' element={<Homepage />}/>
        <Route path='/admin' element={<RequireAuth><AdminHome /></RequireAuth>}/>
      </Route>
    </Routes>
  );
}

export default App;
