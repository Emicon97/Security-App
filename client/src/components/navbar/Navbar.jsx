import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBarBoss from "./NavBarBoss";
import NavBarSupervisor from "./NavBarSupervisor";
import NavBarWatcher from "./NavBarWatcher";
import ViewProfileHome from "../reusable/ViewProfileHome";

import logo from "../../assets/logo.png";

export default function NavBar({ isRendered, show, setShow }) {
  const navigate = useNavigate();
  const handleRedirectLogOut = (e) => {
    localStorage.removeItem("auth-token");
    navigate("/login");
  };

  //====================================================
  //  DATOS DE PRUEBA PARA SIMULAR ROL
  //====================================================
  // creo un estado para guardar el string del path que tiene el rol;
  const [state, setState] = useState("");
  const role = localStorage.getItem("user");
  const id = localStorage.getItem("id");

  useEffect(() => {
    if (role === "boss" || role === "watcher" || role === "supervisor") {
      setState(role);
    }
  }, [role]);
  //====================================================

  let NavBar;
  if (id) {
    switch (state) {
      case "boss":
        NavBar = <NavBarBoss userData={id} show={show} setShow={setShow} />;
        break;
      case "supervisor":
        NavBar = (
          <NavBarSupervisor userData={id} show={show} setShow={setShow} />
        );
        break;
      case "watcher":
        NavBar = <NavBarWatcher userData={id} show={show} />;
        break;
      default:
        isRendered = false;
    }
  }

  const URLREDIRECT = `/${role}/${id}`;
  let user = useSelector((state) => state.userDetails);

  return (
    <>
      {isRendered ? (
        <div>
          <div className="bg-[#ffffff] h-16 w-screen fixed top-0 flex items-center justify-between shadow shadow-gray-300">
            <div className="flex items-center ml-[17px]">
              <img src={logo} alt="Not found" className="h-14 w-14 ml-1" />
              {show ? (
                <h2 className="h-auto w-full font-['nunito'] flex items-center text-4xl font-extrabold ml-2 ease-in-out transition duration-700">
                  <span className="text-[#0023c4]">C</span>
                  <span>entine</span>
                  <span className="text-[#ff5cf4]">l</span>
                </h2>
              ) : (
                <h2 className="opacity-0 h-auto w-full font-['nunito'] flex items-center text-4xl font-extrabold ml-2 ease-in-out transition duration-700">
                  <span className="text-[#0023c4]">C</span>
                  <span>entine</span>
                  <span className="text-[#ff5cf4]">l</span>
                </h2>
              )}
            </div>
            <div className="flex flex-row items-center w-96">
              <ViewProfileHome show={show} />
              <button
                aria-label="close"
                id="close"
                onClick={() => setShow(false)}
                className={`${show ? "" : "hidden"} h-6 w-6 mr-4`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="#ff5cf4"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                aria-label="open"
                id="open"
                onClick={() => setShow(true)}
                className={`${show ? "hidden" : ""} h-6 w-6 mr-4`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="#0023c4"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div
            className={`${
              show ? "" : "-translate-x-[64%]"
            } shadow shadow-gray-300 flex justify-center ease-in-out transition duration-700 fixed top-[65px] bottom-0 left-0 w-[244px] bg-[#ffffff]`}
          >
            <ul
              className={`${
                show ? "" : "translate-x-[97%]"
              } ease-in-out transition duration-700 flex flex-col justify-between`}
            >
              {NavBar}
              <a
                className={`flex justify-center w-full mb-[30px] mx-auto font-['nunito'] ${
                  show ? "" : "-translate-x-[23%]"
                } ${
                  role === "watcher" ? "-translate-x-[5%]" : ""
                } ease-in-out transition duration-700`}
              >
                <button onClick={handleRedirectLogOut}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 focus:bg-[#0023c436]"
                    viewBox="0 0 20 20"
                    fill="#0023c4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleRedirectLogOut}
                  className="cursor-pointer font-extrabold ml-1 text-[#ff5df4] hover:text-[#0023c4]"
                >
                  <p
                    className={`${
                      show
                        ? ""
                        : "opacity-0 ease-in-out transition duration-1000"
                    }`}
                  >
                    Log out
                  </p>
                </button>
              </a>
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}
