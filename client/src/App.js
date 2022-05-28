import React from "react";
import { Route, Routes, BrowserRouter} from "react-router-dom";
import NavBar from "./components/NavBar";
import TableInfoSupervisors from "./components/supervisor/TableInfoSupervisors";
import GuardProfile from "./components/guard/GuardProfile";
import PerfilGuardia from "./components/PerfilGuardia";
import AddUser from "./components/boss/AddUser";


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/' element={<AuthenticationBtn />} />
        <Route path="/bossHome" element={<BossHome/>}/>
        {/* <Route path="/bossHome/addUser" element={[<BossHome/>, <BossAddUser/>]}/>
        <Route path="/bossHome/supervisors" element={[<BossHome/>, <TableInfoSupervisors/>]}/> */}
        {/* <Route path="/bossHome" element={<BossHome/>}/> */}
        <Route path="/BossNewUser" element={<BossAddUser/>}/>
        <Route path='/TableInfoSupervisors' element={<TableInfoSupervisors />} />
       
        <Route path='/GuardProfile/:id' element={<GuardProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;