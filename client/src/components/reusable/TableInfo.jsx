import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getEmployees,
  getUsersPaginateAll,
} from "../../redux/actions";
import "../styles/TableInfo.css";
import { Tertiary, Input } from "../styles/Buttons";
import Modal from "./Modal";
import EditEmployees from "../supervisor/EditEmployees";
import LoginController from "../reusable/LoginController";
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';


export default function TableInfo(props) {
  const dispatch = useDispatch();
  const location = useLocation()
  let user = location.pathname.split("/")[1]

  //empleados por página
  const watchers = useSelector((state) => state.usersPaginate);
  const hierarchy = useSelector((state) => state.userDetails[1]);

  //total de empleados para calcular el total de paginas
  const employees = useSelector((state) => state.employees);
  const header = LoginController();

  //toma el id del usuario actual
  const { id } = useParams();

  //====================================
  //============== STATES ==============
  //====================================

  const [active, setActive] = useState(false);
  const [editUser, setEditUser] = useState({});
  const [limit, setLimit] = useState(5); //limite de empleados por pagina
  const [skip, setSkip] = useState(0); //empleado inicial por pagina
  const [pagesNum, setPagesNum] = useState([]); //array de paginas totales
  const [nameEmployee, setNameEmployee] = useState(""); //guardo los datos del input
  const [filtered, setFiltered] = useState([]);
  const [freeze, setFreeze] = useState(true) //revisa si el vaciamiento del searchbar fue forzado.
  
  //====================================
  //====================================

  //total de empleados para calcular el total de paginas
  let usersNum = employees.length;

  //====================================
  // Pages and limit ===================
  const nextPage = (event) => {
    //cambiar de pagina
    setSkip(event.target.textContent * limit - limit);
  };
  const handleLimit = (event) => {
    //cambiar el limite por pagina
    setLimit(event.target.value);
    setNameEmployee("");
  };
  //Each time you click the edit button, the function will be called
  useEffect(() => {
    dispatch(getUsersPaginateAll(id, limit, skip, header));
    let pages = [];
    for (let i = 0; i < Math.ceil(usersNum / limit); i++) {
      pages.push(i + 1);
    }
    setPagesNum(pages);
  }, [dispatch, limit, skip]);
  //====================================
  //====================================

  //====================================
  // Search ============================
  useEffect(() => {
    dispatch(getEmployees(id, header));
    setFiltered(watchers);
  }, [watchers])

  useEffect(()=> {
    if (!freeze && nameEmployee.length) {
      let toFilter = [];

      let names = nameEmployee.trim().split(' ');
      console.log(names)

      employees.forEach((worker) => {
        names.forEach(word => {
          if (word.length) {
            if (!toFilter.includes(worker) && worker.name.includes(word)) {
              toFilter.push(worker);
            } else if (!toFilter.includes(worker) && worker.lastName.includes(word)) {
              toFilter.push(worker);
            }
          }
        })
      })
      setFiltered(toFilter);
    } else if (!freeze && !nameEmployee.length) {
      setFiltered(watchers);
    }
  }, [nameEmployee]);

  const handleSearch = (event) => {
    //funcion para actualizar el estado con el valor del input search
    setFreeze(false);
    setNameEmployee(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFreeze(true);
    setNameEmployee("");
  };
  const allButton = (e) => {
    //function para resetear la busqueda
    e.preventDefault();
    setFiltered(watchers);
    setNameEmployee("");
  };
  //====================================
  //====================================

  //====================================
  // Form ==============================
  const toggle = () => {
    setActive(!active);
  };
  function reply_click(id) {
    setEditUser(watchers.find((employee) => employee._id === id));
  }
  // ===================================
  //====================================
  
  const handleCheckbox = (e) => {
    if (e.target.checked) {
      document
      .querySelectorAll(".checkbox")
      .forEach((checkbox) => (checkbox.checked = true));
    } else {
      document
      .querySelectorAll(".checkbox")
      .forEach((checkbox) => (checkbox.checked = false));
    }
  };
  return (
    <>
      <div className="w-screen flex flex-col items-center">
        <div className="w-9/12 flex justify-between items-center">
          <div className="flex items-center justify-between w-40 gap-2.5">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            <input type="checkbox" onClick={handleCheckbox} />
          </div>
          <form onSubmit={handleSubmit}>
            <button type="submit">Search</button>
            <input
              type="text"
              placeholder="Search name..."
              value={nameEmployee}
              className={Input()}
              onChange={handleSearch}
            ></input>
          </form>
          <div className="search flex mr-4">
            <button className={Tertiary} onClick={(e) => allButton(e)}>
              All
            </button>
          </div>
        </div>
        <div className="w-9/12">
          <div className="w-full my-2.5">
            <div className="h-10 flex justify-evenly items-center border-2 border-[#0243EC] rounded-full">
              <h1 className="w-48 h-full flex justify-center items-center">
                Check
              </h1>
              <h1 className="w-48 h-full flex justify-center items-center">
                Name
              </h1>
              <h1 className="w-48 h-full flex justify-center items-center">
                Environment
              </h1>
              <h1 className="w-48 h-full flex justify-center items-center">
                Edit
              </h1>
            </div>
          </div>
          <div className="w-full border-2 border-[#0243EC] rounded-2xl mb-2.5">
            {filtered.length
              ? filtered.map((employee, i) => (
                  <div
                    className="h-10 flex justify-evenly items-center hover:bg-[#0243ec85]"
                    key={employee + i}
                  >
                    <div className="w-48 h-full flex justify-center items-center">
                      <input type="checkbox" className="checkbox" />
                    </div>
                    <h1 className="w-48 h-full flex justify-center items-center">
                      {employee.name} {employee.lastName}
                    </h1>
                    <h1 className="w-48 h-full flex justify-center items-center">
                      {employee.environment}
                    </h1>
                    <button
                      onClick={(e) => {
                        toggle();
                        reply_click(employee._id);
                      }}
                      className="w-48 h-full flex justify-center items-center"
                    >
                      <svg
                        id={employee._id}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <Link to={{
                      state: `${employee._id}`,
                      pathname: `/${user}/${employee._id}/createTask`,
                    }}>
                      <button id={employee._id}>➕</button>
                    </Link>
                  </div>
                ))
              : null}
          </div>
        </div>
        <div className="w-9/12 h-10 flex justify-between items-center">
          <div className="w-52 h-full flex items-center justify-center border-2 border-[#0243EC] rounded-2xl">
            Show
            <select
              name="n-entries"
              id="n-entries"
              className="m-2"
              onClick={handleLimit}
              defaultValue="5"
            >
              <option value="20">20</option>
              <option value="10">10</option>
              <option value="5">5</option>
            </select>
            entries
          </div>
          <div className="w-96 h-full flex items-center justify-center border-2 border-[#0243EC] rounded-2xl">
            <ul className="w-full flex justify-around">
              {pagesNum
                ? pagesNum.map((num) => (
                    <li
                      key={num}
                      onClick={nextPage}
                      className="w-6 h-6 flex justify-center items-center hover:bg-[#0243EC] hover:text-white hover:rounded-md hover:font-semibold"
                    >
                      <span className="active">{num}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
      </div>
      <Modal active={active} toggle={toggle}>
        <EditEmployees user={editUser} hierarchy={hierarchy} allButton={allButton}></EditEmployees>
      </Modal>
    </>
  );
}
