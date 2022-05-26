import React from "react";
import { Route, Link, Routes } from "react-router-dom";
import BossHome from "./components/BossHome";
import BossAddUser from "./components/BossAddUser";
import Landing from "./components/Landing";
import TableInfoSupervisors from "./components/TableInfoSupervisors";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path="/bossHome" element={<BossHome/>}/>
        <Route path="/bossHome/addUser" element={[<BossHome/>, <BossAddUser/>]}/>
        <Route path="/bossHome/supervisors" element={[<BossHome/>, <TableInfoSupervisors/>]}/>
      </Routes>
    </>
  );
};

export default App;