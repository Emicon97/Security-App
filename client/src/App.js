import { useEffect, useState } from "react";
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
import SeeInferiorTask from "./components/reusable/SeeInferiorTask";


import { destroyData } from "./redux/actions";
import { useLocation } from 'react-router-dom';
import SentReports from './components/reusable/Reports';

function App() {
  let navigate = useNavigate();
  const token = localStorage.getItem('auth-token');
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const location = useLocation()
  useEffect(()=>{
    if(token){
      let user = localStorage.getItem('user');
      const id = localStorage.getItem('id');
      let view = location.pathname.split("/")[3]
      if(user==='watcher'){
        user = 'guard'
      }
      if(view){
        return navigate(`/${user}/${id}/${view}`);
      }
      return navigate(`/${user}/${id}`);
    }
    if(!token){
      navigate('/');
      dispatch(destroyData());
      return;
    }
    // eslint-disable-next-line
  },[token]);

  return (
    <>
      <NavBar isRendered={token} show={show} setShow={setShow}/>
      <Routes>
        {/* <Route exact path="/" element={<LandingPage />} /> */}
        <Route exact path="/" element={<Login/>}/>
        {/* <Route path="/" element={<NavBar />}/> */}
        
        {/* Rutas HOME para cada rol */}
        <Route exact path="/boss/:id" element={<Home show={show} />}/>
        <Route exact path="/supervisor/:id" element={<Home show={show} />}/>
        <Route exact path="/guard/:id" element={<Home show={show} />} />
        
        {/* Ruta para ver empleados */}
        <Route path="/:user/:id/employees" element={<TableInfoWithAddUser show={show} />} />

        {/* Rutas para el SUPERVISOR */}
        <Route path="/editState/:id" element={<EditState show={show} />} />
        
        {/* Rutas GENERALES */}
        <Route path="/:user/:id/add" element={<NewAddUser show={show} />} />
        <Route exact path="/:user/:id/profile" element={<UserProfile show={show} />} />
        <Route path="/:user/:id/tasks" element={<Tasks show={show} />} />
        <Route path="/:user/:id/createTask" element={<CreateNewTask show={show} />} />
        <Route path="/:user/:id/editTask" element={<SeeInferiorTask show={show} />} />
        <Route path="/:user/:id/reports" element={<SentReports show={show} />} />

        {/* NOT FOUND */}
        <Route path="*" element={<Redirect/>}/>
      </Routes>
    </>
  );
}

export default App;
