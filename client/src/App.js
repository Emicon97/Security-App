import React from "react";
import { Route, Routes } from "react-router-dom";
import BossHome from "./components/boss/BossHome";
import AuthenticationBtn from "./components/authentication/AuthenticationBtn";
import BossAddUser from "./components/boss/BossAddUser";
import TableInfoSupervisors from "./components/supervisor/TableInfoSupervisors";
import GuardProfile from "./components/guard/GuardProfile";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<AuthenticationBtn />} />
        <Route path="/bossHome" element={<BossHome/>}/>
        <Route path="/BossNewUser" element={<BossAddUser/>}/>
        <Route path='/TableInfoSupervisors' element={<TableInfoSupervisors />} />
        <Route path='/GuardProfile' element={<GuardProfile />} />
      </Routes>
    </>
  );
};

export default App;