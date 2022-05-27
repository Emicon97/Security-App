import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import BossHome from "./components/BossHome";
import AuthenticationBtn from "./components/AuthenticationBtn"
import BossAddUser from "./components/BossAddUser";
// import Landing from "./components/Landing"
import TableInfoSupervisors from "./components/TableInfoSupervisors";
import TestActions from "./components/TestActions";
// import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history"

function App() {
  return (
    <BrowserRouter>
     
    <div>
      <Routes>
        <Route path='/' element={<AuthenticationBtn />} />
        <Route path="/bossHome" element={<BossHome/>}/>
        <Route path="/BossNewUser" element={<BossAddUser/>}/>
        <Route path='/TableInfoSupervisors' element={<TableInfoSupervisors />} />
        <Route path='/test' element={<TestActions/>}/>
      </Routes>
      </div>
      
    </BrowserRouter>
  );
};

export default App;