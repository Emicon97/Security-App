import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar/Navbar";
import AddUser from "./components/boss/AddUser";
import EditState from './components/reusable/EditState';
import UserProfile from "./components/reusable/Profile";
import LoginFake from "./components/LoginFake";
import TableInfoWithAddUser from "./components/reusable/TableWithAddUser";
import Home from "./components/Home";
import TableInfo from './components/reusable/TableInfo';

function App() {
//objeto que simula datos del usuario logeado
  let user = {
    id: '629248c63b94e38d4f2a3790',
    name: 'guardia',
    roles: 'watcher',
  }

  return (
    <>
      <NavBar />
      <Routes>
        {/* Rutas HOME para cada rol */}
        <Route exact path="/boss/:id" element={<Home/>}/>
        <Route exact path="/supervisor/:id" element={<Home/>}/>
        <Route exact path="/guard/:id" element={<Home/>} />
        
        {/* Rutas para el BOSS */}
        <Route path="/user/:id" element={<TableInfoWithAddUser />} />

        {/* Rutas para el SUPERVISOR */}
        <Route path="/editState/:id" element={<EditState />} />
        
        {/* Rutas GENERALES */}
        <Route path="/user/add" element={<AddUser />} />
        <Route exact path="/user/:id/profile" element={<UserProfile />} />
        <Route path="/login" element={<LoginFake/>}/>

      </Routes>
    </>
  );
}

export default App;
