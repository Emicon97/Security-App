import React from "react";
import { Route, Routes, BrowserRouter} from "react-router-dom";
import NavBar from "./components/Navbar";
import TableInfoSupervisors from "./components/supervisor/TableInfoSupervisors";
import GuardProfile from "./components/guard/GuardProfile";
import AddUser from "./components/boss/newAddUser";
import EditState from './components/EditState/EditState';
import UserProfile from "./components/reusable/Profile";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/home' />
        <Route path='/home/add' element={<AddUser />} />
        <Route path='/supervisor' element={<TableInfoSupervisors />} />
        <Route exact path='/guard/:id' element={<GuardProfile />} />
        <Route exact path='/guard/:id/profile' element={<UserProfile/>}/>
        <Route path='/editState/:id' element={<EditState />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;