import React from "react";
import { Route, Routes, BrowserRouter} from "react-router-dom";
import NavBar from "./components/Navbar";
import AddUser from "./components/boss/AddUser";
import EditState from './components/EditState/EditState';
import { UseProtectedRouteHome, UseProtectedRoutes} from "./customHooks/ProtectedRoutes";
import GuardProfile from "./components/guard/GuardProfile";

function App() {
//objeto que simula datos del usuario logeado
  let user = {
    id: '629248c63b94e38d4f2a3790',
    name: 'guardia',
    roles: 'watcher',
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<h2>texto de prueba</h2>}/>
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
        />



        {/* <Route path='/home'/>
        <Route path='/home/add' element={<AddUser />} />
        <Route path='/home/supervisor' element={<TableInfoSupervisors />} />
        <Route path='/guard/:id' element={<GuardProfile />} />
        <Route path='/EditState/:id' element={<EditState />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;