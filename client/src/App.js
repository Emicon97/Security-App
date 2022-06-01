import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import AddUser from "./components/boss/AddUser";
import EditState from './components/reusable/EditState';
import { UseProtectedRouteHome, UseProtectedRoutes} from "./customHooks/ProtectedRoutes";
import GuardProfile from "./components/guard/GuardProfile";
import TableInfoSupervisors from "./components/supervisor/TableInfoSupervisors";
import TableInfo from "./components/supervisor/TableInfo";
import UserProfile from "./components/reusable/Profile";

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

        {/* Rutas sin modificar por si pinta eliminar las de arriba */}
        <Route path="/home/add" element={<AddUser />} />
        <Route path="/super" element={<TableInfoSupervisors />} />
        <Route path="/supervisor/:id" element={<TableInfo />} />
        <Route exact path="/guard/:id" element={<GuardProfile />} />
        <Route exact path="/guard/:id/profile" element={<UserProfile />} />
        <Route path="/editState/:id" element={<EditState />} />
      </Routes>
    </>
  );
}

export default App;
