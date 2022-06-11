import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getToDosById,
  getUsersById,
  getTaskReports,
} from "../../redux/actions";
import LoginController from "./LoginController";

export default function SeeInferiorTask(props) {
  let dispatch = useDispatch();
  const { id } = useParams();
  const header = LoginController();

  const userTasks = useSelector((state) => state.todosId);
  const userDetails = useSelector((state) => state.userDetails[0]);

  useEffect(() => {
    dispatch(getToDosById(id, header));
    dispatch(getUsersById(id, header));
    //dispatch(getTaskReports(id, header));
  }, []);

  return (
    <div>
      {userDetails && <h1>You are seeing {userDetails.name} tasks </h1>}
      <ul>
        {" "}
        <br />
        {userTasks &&
          userTasks.map((task) => (
            <>
              <li key={task._id}>
                {task.name} {task.priority} {task.status}
              </li>
              <button >See Reports</button>
            </>
          ))}
      </ul>
    </div>
  );
}
