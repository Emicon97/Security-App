import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import TableInfoSupervisors from "./components/supervisor/TableInfoSupervisors";
import TableInfo from "./components/supervisor/TableInfo";
import GuardProfile from "./components/guard/GuardProfile";
import AddUser from "./components/boss/AddUser";
import EditState from "./components/EditState/EditState";
import UserProfile from "./components/reusable/Profile";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/home/add" element={<AddUser />} />
        <Route path="/supervisor" element={<TableInfoSupervisors />} />
        <Route path="/supervisor" element={<TableInfo />} />
        <Route exact path="/guard/:id" element={<GuardProfile />} />
        <Route exact path="/guard/:id/profile" element={<UserProfile />} />
        <Route path="/editState/:id" element={<EditState />} />
      </Routes>
    </>
  );
}

export default App;
