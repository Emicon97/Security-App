import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import BossHome from "./components/BossHome";
import AuthenticationBtn from "./components/AuthenticationBtn"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthenticationBtn/>}/>
        <Route path='/' element={<Landing/>}/>
        <Route path="/bossHome" element={<BossHome/>}/>
      </Routes>
    </>
  );
};

export default App;