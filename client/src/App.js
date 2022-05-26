import React from "react";
import { Route, Routes } from "react-router-dom";
import BossHome from "./components/BossHome";
import AuthenticationBtn from "./components/AuthenticationBtn"
import BossAddUser from "./components/BossAddUser";
import Landing from "./components/Landing"
import TableInfoSupervisors from "./components/TableInfoSupervisors";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<AuthenticationBtn />} />
        <Route path="/bossHome" element={<BossHome/>}/>
        <Route path="/BossNewUser" element={<BossAddUser/>}/>
        <Route path='/TableInfoSupervisors' element={<TableInfoSupervisors />} />
      </Routes>
    </>
  );
};

export default App;