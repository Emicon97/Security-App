import React, { useDeferredValue, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getEmployees, searchEmployees, deleteUser } from "../../redux/actions";
import "../styles/TableInfo.css";
import { Tertiary, Input  } from "../styles/Buttons";
import Modal from "./Modal";
import EditUser from "../supervisor/EditUser";

//hacer filtrado por uno solo, para boton delete llenar un estado
//propuesta al back para pedir el id del guardia, boton de mas para agregar un guardia

export default function TableInfo({ id }) {
  const dispatch = useDispatch();
  const watchers = useSelector((state) => state.employees);
  const [active, setActive] = useState(false);
  const[editUser, setEditUser] = useState({});

  const toggle = () => {
    setActive(!active);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchEmployees(id, e.target.value));
  };

  const handleAllButton = (e) => {
    e.preventDefault();
    dispatch(searchEmployees(id, ""));
  };

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

  function reply_click(e) {
    setEditUser(watchers.find((employee) => employee._id === e.target.id));
  }

  //Each time you click the edit button, the function will be called
  useEffect(() => {
    dispatch(getEmployees(id, ""));
  }, [dispatch, id]);
  return (
    <>
      <div className="w-screen flex flex-col items-center">
        <div className="w-9/12 flex justify-between items-center">
          <div className="flex items-center justify-between w-40 gap-2.5">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            <input type="checkbox" onClick={handleCheckbox} />
          </div>
          <div>
            <input type="text" placeholder="Search name..." className={Input()} onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}></input>
          </div>
          <div className="search flex mr-4">
            <button className={Tertiary} onClick={(e) => handleAllButton(e)}>All</button>
          </div>
        </div>
        {/* <table className="w-9/12">
          <thead>
            <tr className="h-10">
              <th className="border-x-2 border-[#b6c2e2]">Check</th>
              <th className="border-x-2 border-[#b6c2e2]">Name</th>
              <th className="border-x-2 border-[#b6c2e2]">Environment</th>
              <th className="border-x-2 border-[#b6c2e2]">Edit</th>
            </tr>
          </thead>
          <tbody>
            {
              watchers && watchers.map((employee) => (
                  <tr key={employee._id}>
                    <td className="border-x-2 border-[#b6c2e2]">
                      <input type="checkbox" className="checkbox" />
                    </td>
                    <td className="border-x-2 border-[#b6c2e2]">
                      {employee.name} {employee.lastName}
                    </td>
                    <td className="border-x-2 border-[#b6c2e2]">{employee.environment}</td>
                    <td className="border-x-2 border-[#b6c2e2]">
                      <button
                        onClick={(e) => {
                          toggle(e);
                          reply_click(e);
                        }}
                      >
                        <i className="material-icons" id={employee._id}>edit</i>
                      </button>
                    </td>
                  </tr>
              ))
            }
          </tbody>
        </table> */}
        <div className="w-9/12">
          <div className="w-full my-2.5">
            <div className="h-10 flex justify-evenly items-center border-2 border-[#0243EC] rounded-full">
              <h1 className="w-48 h-full flex justify-center items-center">Check</h1>
              <h1 className="w-48 h-full flex justify-center items-center">Name</h1>
              <h1 className="w-48 h-full flex justify-center items-center">Environment</h1>
              <h1 className="w-48 h-full flex justify-center items-center">Edit</h1>
            </div>
          </div>
          <div className="w-full border-2 border-[#0243EC] rounded-2xl mb-2.5">
              {
                watchers && watchers.map((employee) => (
                  <div className="h-10 flex justify-evenly items-center hover:bg-[#0243ec85]">
                    <div className="w-48 h-full flex justify-center items-center">
                      <input type="checkbox" className="checkbox" />
                    </div>
                    <h1 className="w-48 h-full flex justify-center items-center">{employee.name} {employee.lastName}</h1>
                    <h1 className="w-48 h-full flex justify-center items-center">{employee.environment}</h1>
                    <button onClick={(e) => { toggle(e); reply_click(e); }} className="w-48 h-full flex justify-center items-center">
                      <svg id={employee._id} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                  </div>
                ))
              }
          </div>
        </div>
        <div className="w-9/12 h-10 flex justify-between items-center">
          <div className="w-52 h-full flex items-center justify-center border-2 border-[#0243EC] rounded-2xl">
            Show
            <select name="n-entries" id="n-entries" className="m-2">
              <option value="20">20</option>
              <option value="10">10</option>
              <option value="5">5</option>
            </select>
            entries
          </div>
          <div className="w-96 h-full flex items-center justify-center border-2 border-[#0243EC] rounded-2xl">
            <ul className="w-full flex justify-around">
              <li className="w-6 h-6 flex justify-center items-center hover:bg-[#0243EC] hover:text-white hover:rounded-md hover:font-semibold">
                <span className="active">1</span>
              </li>
              <li className="w-6 h-6 flex justify-center items-center hover:bg-[#0243EC] hover:text-white hover:rounded-md hover:font-semibold">
                <button>2</button>
              </li>
              <li className="w-6 h-6 flex justify-center items-center hover:bg-[#0243EC] hover:text-white hover:rounded-md hover:font-semibold">
                <button>3</button>
              </li>
              <li className="w-6 h-6 flex justify-center items-center hover:bg-[#0243EC] hover:text-white hover:rounded-md hover:font-semibold">
                <button>4</button>
              </li>
              <li className="w-6 h-6 flex justify-center items-center hover:bg-[#0243EC] hover:text-white hover:rounded-md hover:font-semibold">
                <span>...</span>
              </li>
              <li className="w-6 h-6 flex justify-center items-center hover:bg-[#0243EC] hover:text-white hover:rounded-md hover:font-semibold">
                <button>11</button>
              </li>
              <li className="w-6 h-6 flex justify-center items-center hover:bg-[#0243EC] hover:text-white hover:rounded-md hover:font-semibold">
                <button>12</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Modal active={active} toggle={toggle}>
        <EditUser user={editUser}></EditUser>
      </Modal>
    </>
  );
};
