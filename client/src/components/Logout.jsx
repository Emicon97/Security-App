import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { headerTest, loginPrueba } from "../redux/actions";

import { Input, Primary } from "./styles/Buttons";
import { logout } from './../redux/actions';

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleRedirectLogOut(e) {
    // e.preventDefault();
    dispatch(logout());
    navigate('/prueba')
  }

  // const redirector = (e) => {
  //   e.preventDefault();
  //   dispatch(loginPrueba({ dni: input.dni, password: input.password }));
  // };

  return (
    <div className="flex justify-center items-center">
            {/* <Link to={'/'}> */}
                <button className={`${Primary()} mt-6 font-extrabold text-lg`} onClick={handleRedirectLogOut}>
                    Log out
                </button>
            {/* </Link> */}
    </div>
  );
}