import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import NavBar from "./components/NavBar";
import Homepage from "./pages/Homepage";
import RequireAuth from "./components/RequireAuth";
import ModalContainer from "./components/modals/ModalContainer";
import { useStore } from './store/store';
import { history } from ".";
import { ToastContainer } from "react-toastify";
import Historial from "./pages/Historial";

function App() {
   const { generalStore, authStore } = useStore()

   useEffect(() => {
      if (generalStore.token) {
         authStore.getUsuario();
         history.push('/homepage')
      } else {
         history.push('/')
      }
   }, [generalStore, authStore])

   return (
      <>
         <ToastContainer position="bottom-right" hideProgressBar toastStyle={{ backgroundColor: "#fae8e8" }}/>
         <ModalContainer />
         <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="*" element={<Login />}/>
            <Route
               element={
                  <>
                     <NavBar />
                     <Outlet />
                  </>
               }
            >
               <Route path="/homepage" element={<Homepage />} />
               <Route path="/historial" element={<Historial />} />
            </Route>
         </Routes>
      </>
   );
}

export default App;
