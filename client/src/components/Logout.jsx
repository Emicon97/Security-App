import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { headerTest, loginPrueba } from "../redux/actions";

import { Input, Primary } from "./styles/Buttons";
import { logout } from './../redux/actions';

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(logout());
  }
  
  return (
    <div className="flex justify-center items-center">
            <Link to={'/login'}>
                <button className={`${Primary()} mt-6 font-extrabold text-lg`} onClick={(e)=>{handleSubmit(e)}}>
                    Log out
                </button>
            </Link>
    </div>
  );
}