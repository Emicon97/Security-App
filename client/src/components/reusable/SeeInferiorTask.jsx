import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getToDosById,
  getUsersById,
  getTaskReports,
} from "../../redux/actions";
import LoginController from "./LoginController";
import Modal from "./Modal";
import demo from "../../assets/demo.png";

export default function SeeInferiorTask() {
  const dispatch = useDispatch();
  const id = localStorage.getItem("id");
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
  console.log(editTask)

  useEffect(() => {
    dispatch(getToDosById(id, header));
    dispatch(getUsersById(id, header));
    if (editTask._id) dispatch(getTaskReports(editTask._id, header));
  }, []);

  return (
    <div>
      {userDetails.profilePic && (
        <div>
          <img
            src={userDetails.profilePic ? userDetails.profilePic : demo}
            alt=""
            width="100rem"
          />
          <h3>
            {" "}
            {userDetails.name} {userDetails.lastName}{" "}
          </h3>
          <p>{userDetails.telephone}</p>
          <p>{userDetails.email}</p>
        </div>
      )}
      <div className="ml-80">
        {userDetails && <h2>You are seeing {userDetails.name} tasks </h2>}
        <ul className="mt-20">
          {" "}
          <br />
          {userTasks &&
            userTasks.map((task) => (
              <div key={task._id} >
                <li key={task._id}>
                  {task.name} {task.priority} {task.status}
                </li>
                <button
                  onClick={(e) => {
                    reply_click(task._id);
                    toggle();
                  }}
                >
                  See Reports
                </button>
              </div>
            ))}
        </ul>
      </div>
      <Modal active={active} toggle={toggle}>
        <div>
          <h2>Reports of {editTask.name}</h2>
          <ul>
            {reports.length ? (
              reports.map((report) => (
                <div>
                  <p>{report.title}</p>
                  <p>
                    {report.description ? (
                      report.description
                    ) : (
                      <small>This report has no description</small>
                    )}
                  </p>
                  <img
                    src={
                      report.picture ? (
                        report.picture
                      ) : (
                        <small>This report has no picture</small>
                      )
                    }
                    alt="Report picture"
                  />
                </div>
              ))
            ) : (
              <p>This Task has no reports yet</p>
            )}
          </ul>
        </div>
      </Modal>
    </div>
  );
}
