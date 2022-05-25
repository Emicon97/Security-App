import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import BossHome from "./components/BossHome";
import TableInfoSupervisors from "./components/TableInfoSupervisors";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing/>}/>
      </Routes>
    </>
  );
};

export default App;