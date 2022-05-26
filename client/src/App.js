import React from "react";
import { Route, Link, Routes } from "react-router-dom";
import BossHome from "./components/BossHome";
import BossAddUser from "./components/BossAddUser";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path="/BossNewUser" element={<BossAddUser/>}/>
      </Routes>
    </>
  );
};

export default App;