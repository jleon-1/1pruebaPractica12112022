import logo from './logo.svg';
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Container } from "semantic-ui-react";

import Homepage from './pages/Homepage';
import LoginForm from './components/LoginForm';
import './App.css';
import { Fragment } from 'react';
import RolesPagoPage from './pages/RolesPagoPage';

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route 
          element={
            <Container style={{ marginTop: '6em' }}>
              <Outlet />
            </Container>
          }
        >
          <Route path='/login' element={<LoginForm />} /> 
          <Route path='/roles-de-pago' element={<RolesPagoPage />} /> 
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
