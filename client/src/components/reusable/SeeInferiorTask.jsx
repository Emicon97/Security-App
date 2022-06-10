import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getToDosById, getUsersById } from "../../redux/actions";
import LoginController from "./LoginController";

export default function SeeInferiorTask() {
    let dispatch = useDispatch();
    const id = useParams();
    const header = LoginController();

                                  //a chequear si funca//
    const userTasks = getToDosById(id, header)(dispatch);
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
