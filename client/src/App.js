import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

import Home from "./components/Home";
import NavBar from "./components/navbar/Navbar";
import Login from "./components/Login";
import UserProfile from "./components/reusable/Profile";
import EditState from "./components/reusable/EditState";
import TableInfoWithAddUser from "./components/reusable/TableWithAddUser";

import Redirect from "./customHooks/Redirect";
import NewAddUser from "./components/reusable/NewAddUser";
import Tasks from "./components/reusable/Tasks";
import CreateNewTask from "./components/reusable/CreateNewTask";
import SeeInferiorTask from "./components/reusable/SeeInferiorTask";
import Environment from "./components/reusable/Environment";

import SendRequestEmail from "./components/SendRequestEmail";
import RecoverPass from './components/RecoverPass';
import { destroyData } from "./redux/actions";
import { useLocation } from "react-router-dom";
import SentReports from "./components/reusable/Reports";
import urlManager from './urlManager';

function App() {
  let navigate = useNavigate();
  const token = localStorage.getItem("auth-token");
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const location = useLocation();
  useEffect(() => {
    if (token) {
      var user = localStorage.getItem("user");
      const id = localStorage.getItem("id");
      let view = location.pathname.split("/")[3];
      let employeeId = location.pathname.split("/")[4];
      
      return navigate(urlManager(user, id, view, employeeId));
    } else if (!token) {
      let email = location.pathname.split("/")[1];
      let recover = location.pathname.split("/")[2];
      if (email !== 'email') {
        navigate("/");
        dispatch(destroyData());
      }
      if (email === 'email' && recover !== undefined && recover !== 'recover') {
        navigate("/");
        dispatch(destroyData());
      }
      console.log(recover)
      return;
    }
    // eslint-disable-next-line
  }, [token]);

  return (
    <>
      <NavBar isRendered={token} show={show} setShow={setShow} />
      <Routes>
        {/* <Route exact path="/" element={<LandingPage />} /> */}
        <Route exact strict path="/" element={<Login />} />
        {/* <Route path="/" element={<NavBar />}/> */}

        {/* Rutas HOME para cada rol */}
        <Route exact path="/boss/:id" element={<Home show={show} />} />
        <Route exact path="/supervisor/:id" element={<Home show={show} />} />
        <Route exact path="/guard/:id" element={<Home show={show} />} />

        {/* Ruta para ver empleados */}
        <Route
          path="/:user/:id/employees"
          element={<TableInfoWithAddUser show={show} />}
        />

        {/* Rutas para el SUPERVISOR */}
        <Route path="/editState/:id" element={<EditState show={show} />} />

        {/* Rutas GENERALES */}
        <Route path="/:user/:id/add" element={<NewAddUser show={show} />} />
        <Route
          exact
          path="/:user/:id/profile"
          element={<UserProfile show={show} />}
        />
        <Route path="/:user/:id/tasks" element={<Tasks show={show} />} />
        <Route
          path="/:user/:id/createTask/:employeeId"
          element={<CreateNewTask show={show} />}
        />
        <Route
          path="/:user/:id/seeTasks/:employeeId"
          element={<SeeInferiorTask show={show} />}
        />
        <Route
          path="/:user/:id/reports/:relation"
          element={<SentReports show={show} />}
        />
        <Route
          path="/:user/:id/environment"
          element={<Environment show={show}/>}
        />
        {/* NOT FOUND */}
        <Route path="/email" element={<SendRequestEmail/>}/>
        <Route path="/email/recover/:id/:token/:refresh" element={<RecoverPass/>}/>
        <Route path="*" element={<Redirect/>}/>
      </Routes>
    </>
  );
}

export default App;
