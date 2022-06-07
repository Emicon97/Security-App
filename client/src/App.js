import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar/Navbar";
import AddUser from "./components/boss/AddUser";
import EditState from './components/reusable/EditState';
import UserProfile from "./components/reusable/Profile";
import Login from "./components/Login";
import TableInfoWithAddUser from "./components/reusable/TableWithAddUser";
import Home from "./components/Home";
import LandingPage from "./components/Landing.jsx";
import TableInfo from './components/reusable/TableInfo';
import Redirect from './customHooks/Redirect';
import NewAddUser from "./components/reusable/NewAddUser";
import { useSelector } from "react-redux";

function App() {

  let token = useSelector(state => state.token)
  

  return (
    <>
      <NavBar isRendered={!!token.length}/>
      <Routes>
        {/* <Route exact path="/" element={<LandingPage />} /> */}
        <Route exact path="/" element={<Login/>}/>
        {/* <Route path="/" element={<NavBar />}/> */}
        
        {/* Rutas HOME para cada rol */}
        <Route exact path="/boss/:id" element={<Home/>}/>
        <Route exact path="/supervisor/:id" element={<Home/>}/>
        <Route exact path="/watcher/:id" element={<Home/>} />
        
        {/* Rutas para el BOSS */}
        <Route path="/user/:id" element={<TableInfoWithAddUser />} />

        {/* Rutas para el SUPERVISOR */}
        <Route path="/editState/:id" element={<EditState />} />
        
        {/* Rutas GENERALES */}
        <Route path="/user/add" element={<NewAddUser />} />
        <Route exact path="/user/:id/profile" element={<UserProfile />} />

        {/* NOT FOUND */}
        <Route path="*" element={<Redirect/>}/>
      </Routes>
    </>
  );
}

export default App;
