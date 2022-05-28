import React from "react";
import { Route, Routes, BrowserRouter} from "react-router-dom";
import NavBar from "./components/Navbar";
import TableInfoSupervisors from "./components/supervisor/TableInfoSupervisors";
import GuardProfile from "./components/guard/GuardProfile";
import PerfilGuardia from "./components/PerfilGuardia";
import AddUser from "./components/boss/AddUser";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/home' />
        <Route path='/home/add' element={<AddUser />} />
        <Route path='/home/supervisor' element={<TableInfoSupervisors />} />
        <Route path='/guard/:id' element={<PerfilGuardia />}/>
        <Route path='/GuardProfile/:id' element={<GuardProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;