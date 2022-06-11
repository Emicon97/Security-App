import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getToDosById, getUsersById } from "../../redux/actions";
import LoginController from "./LoginController";

export default function SeeInferiorTask() {
    let dispatch = useDispatch();
    const id = localStorage.getItem('id');
    const header = LoginController();

    const userDetails = getUsersById(id, header)(dispatch);

    useEffect(() => {
      dispatch(getToDosById(id, header))
      dispatch(getUsersById(id, header))
    }, [])

  return (
    <div>
      <h1>You are seeing {userDetails.name} tasks </h1>
    </div>
  );
}
