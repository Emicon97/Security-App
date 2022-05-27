import React from "react";

import { Route, Routes, BrowserRouter} from "react-router-dom";
import BossHome from "./components/boss/BossHome";
import AuthenticationBtn from "./components/authentication/AuthenticationBtn";
import BossAddUser from "./components/boss/BossAddUser";
import TableInfoSupervisors from "./components/supervisor/TableInfoSupervisors";


// import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history"
import GuardProfile from "./components/guard/GuardProfile";
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
        <Route path='/GuardProfile' element={<GuardProfile />} />
      </Routes>
      </div>
      
    </BrowserRouter>
  );
};

export default App;