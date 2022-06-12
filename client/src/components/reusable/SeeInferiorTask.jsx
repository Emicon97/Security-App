import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getToDosById,
  getUsersById,
  getTaskReports,
} from "../../redux/actions";
import LoginController from "./LoginController";
import Modal from "./Modal";

export default function SeeInferiorTask() {
    const dispatch = useDispatch();
    const id = localStorage.getItem('id');
    const header = LoginController();
    const [editTask, setEditTask] = useState({});
    const [active, setActive] = useState(false);
    const userTasks = useSelector((state) => state.todosId);
    const userDetails = useSelector((state) => state.userDetails[0]);
    const reports = useSelector((state) => state.taskReports);
  
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
                <button onClick={e => {reply_click(task._id); toggle()}}>See Reports</button>
              </div>
            ))}
        </ul>
      </div>
      <Modal active={active} toggle={toggle}>
        <div>
          <h1>Reports</h1>
          {reports.length && reports.map(report => (
           <p>{console.log(report)}</p> 
          ))}
        </div>
      </Modal>
    </>
  );
}
