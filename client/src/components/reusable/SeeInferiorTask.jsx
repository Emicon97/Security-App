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
import { useLocation } from "react-router-dom";

export default function SeeInferiorTask() {
  const dispatch = useDispatch();
  const id = localStorage.getItem("id");
  const header = LoginController();
  const [editTask, setEditTask] = useState({});
  const [active, setActive] = useState(false);
  const userDetails = useSelector((state) => state.userDetails[0]);
  const userTasks = useSelector((state) => state.todosId);
  const reports = useSelector((state) => state.taskReports);
  const userId = useLocation().pathname.split("/")[2];

  function reply_click(id) {
    setEditTask(userTasks.find((task) => task._id === id));
  }

  const toggle = () => {
    setActive(!active);
  };

  useEffect(() => {
    dispatch(getToDosById(userId, header));
    dispatch(getUsersById(userId, header));
  }, [userId, userDetails, userTasks]);

  useEffect(() => {
    if (editTask._id) dispatch(getTaskReports(editTask._id, header));
  }, [editTask]);
  
  if (userDetails.profilePic) {
    return (
      <div>
        <div class="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        {userDetails.profilePic && (
          <div>
            <img
              src={userDetails.profilePic ? userDetails.profilePic : demo}
              alt="Profile picture"
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
          {userDetails.name && (
            <h2>You are seeing {userDetails.name} tasks </h2>
          )}
          <ul className="mt-20">
            {" "}
            <br />
            {userTasks.length ? (
              userTasks.map((task) => (
                <div key={task._id}>
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
              ))
            ) : (
              <h2>This user has no tasks</h2>
            )}
          </ul>
        </div>
        <Modal active={active} toggle={toggle}>
          <div>
            <h2>Reports of {editTask.name}</h2>
            <ul>
              {console.log(reports)}
              {reports.report ? (
                reports.report.map((report) => (
                  <div key={report._id}>
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
}
