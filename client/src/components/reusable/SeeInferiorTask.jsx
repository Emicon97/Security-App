import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getToDosById,
  getUsersById,
  getTaskReports,
} from "../../redux/actions";
import LoginController from "./LoginController";
import Modal from "./Modal";

export default function SeeInferiorTask(props) {
  let dispatch = useDispatch();
  const { id } = useParams();
  const header = LoginController();
  const [editTask, setEditTask] = useState({});
  const [active, setActive] = useState(false);
  const userTasks = useSelector((state) => state.todosId);
  const userDetails = useSelector((state) => state.userDetails[0]);

  function reply_click(id) {
    setEditTask(userTasks.find((task) => task._id === id));
  }

  const toggle = () => {
    setActive(!active);
  };

  useEffect(() => {
    dispatch(getToDosById(id, header));
    dispatch(getUsersById(id, header));
    if(editTask._id) dispatch(getTaskReports(editTask._id, header));
  }, []);

  return (
    <>
      <div className="ml-80">
        {userDetails && <h1>You are seeing {userDetails.name} tasks </h1>}
        <ul>
          {" "}
          <br />
          {userTasks &&
            userTasks.map((task) => (
              <div key={task._id}>
                <li key={task._id}>
                  {task.name} {task.priority} {task.status}
                </li>
                <button onClick={e => reply_click(task._id)}>See Reports</button>
              </div>
            ))}
        </ul>
      </div>
      <Modal></Modal>
    </>
  );
}
