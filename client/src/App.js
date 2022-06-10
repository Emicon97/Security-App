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
import { AutoAuhtentication } from "./redux/LocalStorage";

function App() {
  let navigate = useNavigate();
  const header = localStorage.getItem('auth-token')
  const dispatch = useDispatch();
  useEffect(()=>{
    console.log(typeof header)
    if(!header){
      //dispatch(AutoAuhtentication())
      //dispatch(destroyData());
    }
    // eslint-disable-next-line
  },[header]);
  // useEffect(()=>{
  //   if(!token.length){
  //     navigate('/login');
  //     dispatch(destroyData());
  //   }
  //   // eslint-disable-next-line
  // },[token]);

  return (
    <>
      <NavBar isRendered={!!header}/>
      <Routes>
        {/* <Route exact path="/" element={<LandingPage />} /> */}
        <Route exact path="/" element={<Login/>}/>
        {/* <Route path="/" element={<NavBar />}/> */}
        
        {/* Rutas HOME para cada rol */}
        <Route exact path="/boss/:id" element={<Home/>}/>
        <Route exact path="/supervisor/:id" element={<Home/>}/>
        <Route exact path="/guard/:id" element={<Home/>} />
        
        {/* Ruta para ver empleados */}
        <Route path="/user/:id" element={<TableInfoWithAddUser />} />

        {/* Rutas para el SUPERVISOR */}
        <Route path="/editState/:id" element={<EditState />} />
        
        {/* Rutas GENERALES */}
        <Route path="/user/add" element={<NewAddUser />} />
        <Route exact path="/user/:id/profile" element={<UserProfile />} />
        <Route path="/user/tasks/:id" element={<Tasks />} />
        <Route exact path="/user/createTask/:id" element={<CreateNewTask />} />

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
