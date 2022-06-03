import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar/Navbar";
import AddUser from "./components/boss/AddUser";
import EditState from './components/reusable/EditState';
import { UseProtectedRouteHome, UseProtectedRoutes} from "./customHooks/ProtectedRoutes";
import GuardProfile from "./components/guard/GuardProfile";
import TableInfoSupervisors from "./components/supervisor/TableInfoSupervisors";
import UserProfile from "./components/reusable/Profile";
import LoginFake from "./components/LoginFake";
import TableInfoWithAddUser from "./components/reusable/TableWithAddUser";
import Home from "./components/Home";
import HomeSupervisor from "./components/supervisor/HomeSupervisor";

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
        {/* <Route path="/" element={<h2>texto de prueba</h2>}/>
        <Route path='/home' 
          element={
            <UseProtectedRouteHome 
            user={user}
            redirectPath='/'
            roles={user ? user.roles : null}
            />
          }
        />
        <Route path='/home/add' 
          element={
            <UseProtectedRoutes
              isAllowed={!!user && user.roles === "boss"}
              children={<AddUser/>}
            />
          } 
        />
        <Route path='/EditState/:id' 
          element={
            <UseProtectedRoutes
              isAllowed={!!user && user.roles === "watcher"}
              children={<EditState />}
            />        
          } 
        />
        <Route path='/guard/:id' 
          element={
            <UseProtectedRoutes
              isAllowed={!!user && user.roles === "watcher"}
              children={<GuardProfile/>}
            />
          }
        /> */}
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
