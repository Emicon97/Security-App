import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getToDosById,
  getUsersById,
  getTaskReports,
  resetReport,
  resetUser,
} from "../../redux/actions";
import LoginController from "./LoginController";
import Modal from "./Modal";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Loader.css";

export default function SeeInferiorTask({ show }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const user = localStorage.getItem("user");
  const header = LoginController();
  const [editTask, setEditTask] = useState({});
  const [active, setActive] = useState(false);
  const userDetails = useSelector((state) => state.userDetails[0]);
  const userTasks = useSelector((state) => state.todosId);
  const reports = useSelector((state) => state.taskReports);
  const userId = useLocation().pathname.split("/")[4];

  function reply_click(id) {
    setEditTask(userTasks.find((task) => task._id === id));
  }

  const toggle = () => {
    setActive(!active);
  };

  const handleRedirectToAssignTask = (e) => {
    e.preventDefault();
    navigate(`/${user}/${id}/createTask/${userId}`);
  };

  useEffect(() => {
    return () => dispatch(resetReport());
  }, []);
  useEffect(() => {
    return () => dispatch(resetUser());
  }, []);

  useEffect(() => {
    dispatch(getToDosById(userId, header));
    dispatch(getUsersById(userId, header));
  }, []);

  useEffect(() => {
    if (editTask._id) dispatch(getTaskReports(editTask._id, header));
  }, [editTask]);

  if (userDetails === undefined) {
    return (
      <div>
        <div className="lds-spinner">
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
      <div
        className={`font-['nunito'] p-2.5 fixed top-16 right-0 bottom-0 ${
          show ? "left-[245px]" : "left-[87px]"
        } overflow-x-hidden ease-in-out transition-all duration-700 overflow-auto font-['nunito']`}
      >
        <div className="w-full h-[50px] rounded-full bg-[#7f91e1] flex justify-between">
          <div className="flex">
            {userDetails.profilePic ? (
              <img
                src={userDetails.profilePic}
                alt="Profile picture"
                className="w-[40px] h-[40px] my-auto ml-[12px] mr-[7px] rounded-full"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-[40px] h-[40px] my-auto ml-[12px] mr-[7px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#cbcfdd"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
            <div className="h-[40px] my-auto flex flex-col">
              <h3 className="flex font-semibold text-white">
                <p>{userDetails.name.charAt(0).toUpperCase()}</p>
                {userDetails.name.slice(1)}{" "}
                {userDetails.lastName.charAt(0).toUpperCase() +
                  userDetails.lastName.slice(1)}
              </h3>
              <small className="text-white">
                {userDetails.email} | {userDetails.telephone}
              </small>
            </div>
          </div>
          <div
            onClick={(e) => handleRedirectToAssignTask(e)}
            className="flex items-center cursor-pointer"
          >
            <button title="Assign task">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="white"
              >
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </button>
            <h2 className="flex items-center font-medium text-white h-[40px] my-auto mr-[12px] mr-[7px] italic">
              Assign task?
            </h2>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="white"
            >
              <path
                fillRule="evenodd"
                d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <h2 className="flex items-center font-medium text-white h-[40px] my-auto mr-[12px] mr-[7px]">
              You're viewing
              <p className="font-semibold ml-1">
                {userDetails.name.charAt(0).toUpperCase() +
                  userDetails.name.slice(1)}
              </p>
              's task reports
            </h2>
          </div>
        </div>
        <div className="w-full h-auto bg-[#fdced4] mt-[5px] rounded-3xl flex items-center justify-center p-2.5 flex flex-wrap gap-[10px]">
          {userTasks.length ? (
            userTasks.map((task) => (
              <div
                onClick={(e) => {
                  reply_click(task._id);
                  toggle(e);
                }}
                key={task._id}
                className={`todo-tasks ${
                  task.priority === "urgent"
                    ? "bg-[#FFE5E8] hover:bg-[#ffd5da]"
                    : task.priority === "high"
                    ? "bg-[#FFEFE4] hover:bg-[#ffe2cf]"
                    : task.priority === "regular"
                    ? "bg-[#ebffe5] hover:bg-[#d4ffc7]"
                    : "bg-[#E8F1FF] hover:bg-[#cfe2ff]"
                }
                  flex flex-col w-[250px] h-auto rounded-2xl p-2.5 cursor-pointer`}
              >
                <div key={task._id}>
                  {/* {task.name} {task.priority} {task.status} */}
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      {task.priority === "urgent" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="#E8132A"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : task.priority === "high" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="#fadd00"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : task.priority === "regular" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="green"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="#1062FF"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      <h4 className="italic ml-1 text-xs">
                        Priority:{" "}
                        {task.priority.charAt(0).toUpperCase() +
                          task.priority.slice(1)}
                      </h4>
                    </div>
                    <span className="flex items-center gap-1.5 italic">
                      {task.status.charAt(0).toUpperCase() +
                        task.status.slice(1)}
                      <p
                        className={`${
                          task.status === "done"
                            ? "h-4 w-4 bg-green-500"
                            : task.status === "left"
                            ? "h-4 w-4 bg-red-500"
                            : "h-4 w-4 bg-yellow-500"
                        } rounded-full`}
                      ></p>
                    </span>
                  </div>
                </div>
                <div className="flex flex-row items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="#cbcfdd"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h1 className="w-full h-auto truncate ml-1 text-base font-semibold text-[#cbcfdd]">
                    {task.name.charAt(0).toUpperCase() + task.name.slice(1)}
                  </h1>
                </div>
              </div>
            ))
          ) : (
            <h2 className="font-semibold text-white">This user has no tasks</h2>
          )}
        </div>
        <Modal active={active} toggle={toggle}>
          <div>
            <h2>Reports of {editTask.name}</h2>
            <ul>
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
