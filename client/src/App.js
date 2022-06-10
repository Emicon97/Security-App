import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import CreateNewTask from "./components/reusable/CreateNewTask";
import HomePrueba from "./components/Prueba/HomePrueba";


import { destroyData } from "./redux/actions";

function App() {
  let navigate = useNavigate();
  const token = localStorage.getItem('auth-token');
  const dispatch = useDispatch();
  useEffect(()=>{
    if(!token){
      navigate('/login');
      dispatch(destroyData());
      return;
    }
    // eslint-disable-next-line
  },[token]);

  return (
    <>
      <NavBar isRendered={!!token}/>
      <Routes>
        {/* <Route exact path="/" element={<LandingPage />} /> */}
        <Route exact path="/" element={<Login/>}/>
        {/* <Route path="/" element={<NavBar />}/> */}
        
        {/* Rutas HOME para cada rol */}
        <Route exact path="/boss/:id" element={<Home/>}/>
        <Route exact path="/supervisor/:id" element={<Home/>}/>
        <Route exact path="/guard/:id" element={<Home/>} />
        
        {/* Ruta para ver empleados */}
        <Route path="/:user/employees/:id" element={<TableInfoWithAddUser />} />

        {/* Rutas para el SUPERVISOR */}
        <Route path="/editState/:id" element={<EditState />} />
        
        {/* Rutas GENERALES */}
        <Route path="/:user/add" element={<NewAddUser />} />
        <Route exact path="/:user/profile/:id" element={<UserProfile />} />
        <Route path="/:user/tasks/:id" element={<Tasks />} />
        <Route exact path="/:user/createTask/:id" element={<CreateNewTask />} />

        {/* ROUTE PRUEBA */}
        <Route path="/prueba/supervisor/:id" element={<HomePrueba/>}/>

        {/* ROUTE PRUEBA */}
        <Route path="/prueba/supervisor/:id" element={<HomePrueba/>}/>

        {/* NOT FOUND */}
        <Route path="*" element={<Redirect/>}/>
      </Routes>
    </>
  );
}

export default App;
