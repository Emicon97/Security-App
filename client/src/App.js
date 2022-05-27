import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import BossHome from "./components/BossHome";
import AuthenticationBtn from "./components/AuthenticationBtn"
import BossAddUser from "./components/BossAddUser";
// import Landing from "./components/Landing"
import TableInfoSupervisors from "./components/TableInfoSupervisors";

// import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history"
import GuardProfile from "./components/PerfilGuardia";
import PerfilGuardia from "./components/PerfilGuardia";

function App() {
  return (
    <BrowserRouter>
     
    <div>
      <Routes>
        <Route path='/' element={<AuthenticationBtn />} />
        <Route path="/bossHome" element={<BossHome/>}/>
        <Route path="/BossNewUser" element={<BossAddUser/>}/>
        <Route path='/TableInfoSupervisors' element={<TableInfoSupervisors />} />
        
        <Route path='/guard/:id' element={<PerfilGuardia/>}/>
      </Routes>
      </div>
      
    </BrowserRouter>
  );
};

export default App;