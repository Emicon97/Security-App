import React from "react";
import { Switch, Route, Link, Routes } from "react-router-dom";
import BossHome from "./components/BossHome";
import AuthenticationBtn from "./components/AuthenticationBtn"

function App() {
  return (
    <>
      <div className="container mx-auto bg-green-400 rounded-xl shadow border p-8 m-10">
        <p className="text-3xl text-gray-700 font-bold mb-5">Welcome!</p>
        <p className="text-gray-500 text-lg">
          React and Tailwind CSS in action
        </p>
      </div>
      <Routes>
        <Route path="/" element={<AuthenticationBtn/>}/>
        <Route path="/bossHome" element={<BossHome/>}/>
      </Routes>
    </>
  );
}


export default App;
