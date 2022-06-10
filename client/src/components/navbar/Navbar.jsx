// import React, { useEffect, useState } from "react";
// import logo from "../../assets/logo.png";
// import NavBarBoss from "./NavBarBoss";
// import NavBarSupervisor from "./NavBarSupervisor";

// import { Link, useLocation } from "react-router-dom";

// import LoginController from "../reusable/LoginController";
// import Logout from "../Logout";
// import NavBarWatcher from "./NavBarWatcher";

// export default function NavBar({isRendered}) {


// //====================================================
// //  DATOS DE PRUEBA PARA SIMULAR ROL
// //====================================================
// // creo un estado para guardar el string del path que tiene el rol;  
//   const [state, setState] = useState("");
//   const prueba = useLocation();
//   const role = prueba.pathname.split("/")[1];
//   const id = prueba.pathname.split("/")[2];
//   const header = LoginController();
//   // let dispatch = useDispatch();

//   useEffect(() => {
//     if(role === "boss" || role === "guard" || role === "supervisor") {
//       setState(role);
//     }
//   }, [role])
// //====================================================
  
//   let NavBar
//   if(id) {
//     switch (state) {
//       case "boss":
//         NavBar = <NavBarBoss userData={id}/>;
//         break;
//       case "supervisor":
//         NavBar = <NavBarSupervisor userData={id}/>;
//         break;
//       case "guard":
//         NavBar = <NavBarWatcher userData={id}/>;
//         break;
//       default:
//         isRendered = false
//     }
//   }

//   const URLREDIRECT = `/${role}/${id}`;

//   return (
//     <>
//       {
//         isRendered ?          
//         <nav className="bg-white mb-5 shadow px-2 sm:px-4 py-2.5">
//           <div className="container flex flex-wrap justify-between items-center mx-auto">
//             <Link to={URLREDIRECT} className="flex">
//               <img src={logo} className="mr-3 h-6 sm:h-9" alt="Centinel Logo" />
//               <span className="self-center text-2xl font-semibold whitespace-nowrap">
//                 Centinel
//               </span>
//             </Link>
//             <button
//               data-collapse-toggle="mobile-menu"
//               type="button"
//               className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
//               aria-controls="mobile-menu"
//               aria-expanded="false"
//             >
//               <span className="sr-only">Open main menu</span>
//               <svg
//                 className="w-6 h-6"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
//                   clipRule="evenodd"
//                 ></path>
//               </svg>
//               <svg
//                 className="hidden w-6 h-6"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 ></path>
//               </svg>
//             </button>
//             <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
//               <ul className="flex flex-col mt-4 md:flex-row md:space-x-12 md:mt-1 md:text-sm md:font-medium">
//                 {NavBar}
//                 <li><Logout /></li>
//               </ul>
//             </div>
//           </div>
//         </nav>
//       : null
//       }
//     </>
//   );
// };

import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import logo from "../../assets/logo.png";
import NavBarBoss from "./NavBarBoss";
import NavBarSupervisor from "./NavBarSupervisor";
import { Link, useLocation } from "react-router-dom";
import LoginController from "../reusable/LoginController";
import { Input } from "../styles/Buttons";
import { logout } from './../../redux/actions';
import NavBarWatcher from "./NavBarWatcher";
import { useNavigate } from 'react-router-dom';

export default function NavBar({isRendered}) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);

  const navigate = useNavigate();
  const handleRedirectLogOut = (e) => {
    localStorage.removeItem('auth-token');
    navigate('/login');
  }
  
  //====================================================
  //  DATOS DE PRUEBA PARA SIMULAR ROL
  //====================================================
  // creo un estado para guardar el string del path que tiene el rol;  
  const [state, setState] = useState("");
  const prueba = useLocation();
  const role = prueba.pathname.split("/")[1];
  const id = prueba.pathname.split("/")[2];
  const header = LoginController();
  // let dispatch = useDispatch();

  useEffect(() => {
    if(role === "boss" || role === "guard" || role === "supervisor") {
      setState(role);
    }
  }, [role])
  //====================================================

  let NavBar
  if(id) {
    switch (state) {
      case "boss":
        NavBar = <NavBarBoss userData={id} show={show} />;
        break;
      case "supervisor":
        NavBar = <NavBarSupervisor userData={id} show={show} />;
        break;
      case "guard":
        NavBar = <NavBarWatcher userData={id} show={show} />;
        break;
      default:
        isRendered = false
    }
  }

  const URLREDIRECT = `/${role}/${id}`;

    return (
        <>
            {
              isRendered ?
              <div>
                  <div className="bg-[#ffffff] h-16 w-screen fixed flex items-center justify-between shadow shadow-gray-300">
                      <div className="flex items-center ml-2.5">
                          <Link to={URLREDIRECT} className="flex">
                              <img src={logo} alt="Not found" className="h-14 w-14 ml-1" />
                              <h2 className="h-auto w-full font-['nunito'] flex items-center text-4xl font-extrabold ml-2"><span className="text-[#0023c4]">C</span><span>entine</span><span className="text-[#ff5cf4]">l</span></h2>
                          </Link>
                          <div className="ml-2.5">
                              <form>
                                  <input type="text" name="searchbar" id="searchbar" className={`${Input()} bg-[#cbcfdd42]`} autoComplete="off" placeholder="Search" />
                              </form>
                          </div>
                      </div>
                      <div className="flex items-center">
                          <button aria-label="open" id="open" onClick={()=>setShow(true)} className={`${show ? 'hidden' : ''} h-8 w-8 mr-4`}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="#0023c4">
                                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                              </svg>
                          </button>
                          <button aria-label="close" id="close" onClick={()=>setShow(false)} className={`${show ? '' : 'hidden'} h-8 w-8 mr-4`}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="#ff5cf4">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                          </button>
                      </div>
                  </div>
                  <div className={`${show ? '' : '-translate-x-[64%]'} shadow shadow-gray-300 flex justify-center ease-in-out transition duration-700 fixed h-full w-[244px] bg-[#ffffff] mt-16`}>
                    <ul className={`${show ? '' : 'translate-x-[97%]'} ease-in-out transition duration-700`}>
                      <li className='flex flex-col gap-1'>
                        {NavBar}
                        <a className={`flex w-full my-2 mt-52 ${NavBar = <NavBarWatcher userData={id} show={show} /> ? 'ml-3' : ''}`}>
                          <button onClick={handleRedirectLogOut} className="flex focus:text-[#0023c4] hover:text-[#0023c4] cursor-pointer focus:outline-none font-['nunito'] font-extrabold text-[#ff5cf4]">
                            <button onClick={handleRedirectLogOut} className="hover:bg-[#0023c436] focus:bg-[#0023c436] rounded-full mr-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 focus:bg-[#0023c436]" viewBox="0 0 20 20" fill="#0023c4">
                                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                              </svg>
                            </button>
                            <p className={`${show ? '' : 'opacity-0'} ease-in-out transition duration-1000 hover:duration-75`}>Log out</p>
                          </button>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                : null
            }
        </>
    );
}
