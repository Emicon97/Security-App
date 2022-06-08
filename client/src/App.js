import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from 'react-router-dom';

import Home from "./components/Home";
import NavBar from "./components/navbar/Navbar";
import Login from "./components/Login";
import UserProfile from "./components/reusable/Profile";
import EditState from './components/reusable/EditState';
import TableInfoWithAddUser from "./components/reusable/TableWithAddUser";

import Redirect from './customHooks/Redirect';
import NewAddUser from "./components/reusable/NewAddUser";
import Tasks from "./components/reusable/Tasks";
import HomePrueba from "./components/Prueba/HomePrueba";

function App() {
  let navigate = useNavigate();
  let token = useSelector(state => state.token);
  
  useEffect(()=>{
    if(!token.length){
      navigate('/login');
    }
  },[token]);

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
        <Route exact path="/guard/:id" element={<Home/>} />
        
        {/* Rutas para el BOSS */}
        <Route path="/user/:id" element={<TableInfoWithAddUser />} />

        {/* Rutas para el SUPERVISOR */}
        <Route path="/editState/:id" element={<EditState />} />
        
        {/* Rutas GENERALES */}
        <Route path="/user/add" element={<NewAddUser />} />
        <Route exact path="/user/:id/profile" element={<UserProfile />} />
        <Route path="/user/tasks" element={<Tasks />} />

        {/* ROUTE PRUEBA */}
        <Route path="/prueba/supervisor/:id" element={<HomePrueba/>}/>



        {/* NOT FOUND */}
        <Route path="*" element={<Redirect/>}/>
      </Routes>
    </>
  );
}

export default App;
