import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import AuthenticationButton from "../authentication/AuthenticationBtn"
import Logout from "../Logout";
import { useDispatch, useSelector } from 'react-redux'
import NavBarBoss from "./NavBarBoss";
import NavBarSupervisor from "./NavBarSupervisor";

import { Link, useLocation } from "react-router-dom";
import NavBarWatcher from "./NavBarWatcher";
import { getUsersById } from "../../redux/actions";

export default function NavBar({isRendered}) {

//====================================================
//  DATOS DE PRUEBA PARA SIMULAR ROL
//====================================================
// creo un estado para guardar el string del path que tiene el rol;  
  let [state, setState] = useState("");
  let prueba = useLocation()
  let pathPrueba = prueba.pathname.split("/")[1]
  // let dispatch = useDispatch();

  useEffect(() => {
    if(pathPrueba === "boss" || pathPrueba === "guard" || pathPrueba === "supervisor") {
      setState(pathPrueba);
    }
  }, [pathPrueba])
//====================================================

  let user = useSelector(state => state.userDetails)
  let NavBar
  
    if (user.length) {
      switch (state) {
        case "boss":
          NavBar = <NavBarBoss userData={user[0]}/>;
          break;
          
        case "supervisor":
          NavBar = <NavBarSupervisor userData={user[0]}/>;
          break;
    
        default:
          NavBar = <NavBarWatcher userData={user[0]}/>;
          break;
      }
    }
  
  let URLREDIRECT = "";
  useEffect(() => {
    if (user.length) {
      URLREDIRECT = `/${pathPrueba}/${user[0]._id}`;
    };
  }, [user])

  // useEffect(() => {
  //   dispatch(getUsersById())
  // }, [dispatch])
  //PARA QUE el navbar desaparezca en la ruta prueba
  if(useLocation().pathname.split("/")[1] === "prueba") isRendered = false
  return (
    <>
      {
        isRendered ?          
        <nav className="bg-white mb-5 shadow px-2 sm:px-4 py-2.5">
          <div className="container flex flex-wrap justify-between items-center mx-auto">
            <Link to={URLREDIRECT} className="flex">
              <img src={logo} className="mr-3 h-6 sm:h-9" alt="Centinel Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                Centinel
              </span>
            </Link>
            <button
              data-collapse-toggle="mobile-menu"
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
              <ul className="flex flex-col mt-4 md:flex-row md:space-x-12 md:mt-1 md:text-sm md:font-medium">
                {NavBar}
                <li><Logout /></li>
              </ul>
            </div>
          </div>
        </nav>
      : null
      }
    </>
  );
};