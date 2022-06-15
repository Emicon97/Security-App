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


export default function TableInfo(props) {
  const dispatch = useDispatch();
  const user = localStorage.getItem('user');
  //empleados por página
  const watchers = useSelector((state) => state.usersPaginate);
  const hierarchy = useSelector((state) => state.userDetails[1]);

  //total de empleados para calcular el total de paginas
  const employees = useSelector((state) => state.employees);
  const header = LoginController();

  //toma el id del usuario actual
  const id = localStorage.getItem('id')
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
      <div className="w-[90%] h-auto mx-auto font-['nunito'] mt-[15px]">
        <div className="flex items-center justify-between">
          <div className="search flex mr-4">
            <button title="Bring back all employees" className={Tertiary} onClick={(e) => allButton(e)}>
              Refresh
            </button>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-row items-center">
            {/* <button title="Search employee" className={Tertiary} type="submit">Search</button> */}
            <input
              type="text"
              placeholder="Search employee..."
              title="Search employees"
              value={nameEmployee}
              className={Input()}
              onChange={handleSearch}
            ></input>
          </form>
          <div className="w-[220px] h-full flex items-center justify-center">
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
            entries of {" "}
            {employees.length}
          </div>
        </div>
        <div>
          <h1 className="w-full my-2.5 text-2xl font-semibold">Employees</h1>
          <div className="w-full h-[240px] overflow-auto mb-2.5 mt-4">
            {
              filtered.length ? 
              filtered.map((employee, i) => (
                <div 
                  title={`${employee.name.charAt(0).toUpperCase() + employee.name.slice(1)} ${employee.lastName.charAt(0).toUpperCase() + employee.lastName.slice(1)}`}
                  className="h-10 flex justify-between items-center border-b-[1px] border-b-[#0243EC] hover:bg-[#0243ec70] mb-2" key={employee + i}>
                  <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <h2 className="w-96 h-full flex justify-start items-center ml-2 font-medium">
                      {employee.name.charAt(0).toUpperCase() + employee.name.slice(1)} {employee.lastName.charAt(0).toUpperCase() + employee.lastName.slice(1)}
                    </h2>
                  </div>
                  <div className="flex">
                    <h2 className="w-auto h-full flex justify-center items-center mr-5">
                      <small className="italic mr-2 mt-0.5">Evironment:</small>{employee.environment}
                    </h2>
                    <button
                      onClick={(e) => {
                        toggle();
                        reply_click(employee._id);
                      }}
                      title="Edit user"
                      className="ml-2 h-full flex justify-center items-center">
                      <svg id={employee._id} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <Link 
                      to={{
                        state: `${employee._id}`,
                        pathname: `/${user}/${id}/createTask/${employee._id}`,
                      }}
                      title="Add a task"
                      className="mx-2 h-full flex justify-center items-center">
                      <button id={employee._id}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              ))
              : null}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-auto h-[43px] flex items-center justify-center">
            <button title="Previous page">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#0243EC">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <ul className="w-full flex justify-around mx-4">
              {
                pagesNum ?
                pagesNum.map((num) => (
                  <li key={num} onClick={nextPage} className="w-6 h-6 flex justify-center items-center">
                    <button title={`Page ${num}`} className="w-2.5 h-2.5 hover:w-3.5 hover:h-3.5 focus:w-3.5 focus:h-3.5 bg-[#0243EC] rounded-full cursor-pointer text-transparent font-[9px]">
                      {num}{/* <span title={`Page ${num}`} className="w-2.5 h-2.5 hover:w-3.5 hover:h-3.5 bg-[#0243EC] rounded-full cursor-pointer text-transparent font-[9px]">{num}</span> */}
                    </button>
                  </li>
                ))
                : null
              }
            </ul>
            <button title="Next page">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#0243EC">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <Modal active={active} toggle={toggle}>
        <EditEmployees user={editUser} hierarchy={hierarchy} allButton={allButton}></EditEmployees>
      </Modal>
    </>
  );
}
