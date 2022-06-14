import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getToDosById,
  getUsersById,
  getTaskReports,
  resetReport,
} from "../../redux/actions";
import LoginController from "./LoginController";
import Modal from "./Modal";
import demo from "../../assets/demo.png";
import { useLocation } from "react-router-dom";
import "../styles/Loader.css"

export default function SeeInferiorTask({show}) {
  const dispatch = useDispatch();
  const id = localStorage.getItem("id");
  const header = LoginController();
  const [editTask, setEditTask] = useState({});
  const [active, setActive] = useState(false);
  const userDetails = useSelector((state) => state.userDetails[0]);
  const userTasks = useSelector((state) => state.todosId);
  const reports = useSelector((state) => state.taskReports);
  const userId = useLocation().pathname.split("/")[4];
  // console.log("this is userDetails" ,userDetails, "this is userTasks", userTasks, "this is reports", reports)

  function reply_click(id) {
    setEditTask(userTasks.find((task) => task._id === id));
  }

  const toggle = () => {
    setActive(!active);
  };

  useEffect(() => {
    return () => dispatch(resetReport());
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
        <div className="lds-spinner mt-80 ml-80">
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
      <div className={`fixed top-16 right-0 bottom-0 ${show ? 'left-[245px]' : 'left-[87px]'} ease-in-out transition-all duration-700 overflow-auto font-['nunito']`}>
          <div className="flex m-[10px] rounded-2xl bg-[#d9e7f5]">
            <div className="w-[500px] h-[100px] ml-[15px] mr-auto my-[15px] border-r-2 border-r-white flex">
              <div className="flex">
                {
                  userDetails.profilePic ? 
                  <img src={userDetails.profilePic} alt="Profile picture" className="m-auto ring ring-[#0d2ec7] border-2 border-transparent h-[90px] w-[90px] rounded-full" /> :
                  <svg xmlns="http://www.w3.org/2000/svg" className="m-auto ring ring-[#0d2ec7] border-2 border-transparent h-[90px] w-[90px] rounded-full" viewBox="0 0 20 20" fill="white">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                  </svg>
                }
                <div className="p-[10px] pl-0 ml-2">
                  <h3 className="text-3xl font-extrabold truncate flex">
                    <p className="text-[#0d2ec7] mr-0.5">{userDetails.name.charAt(0).toUpperCase()}</p>{userDetails.name.slice(1)} {' '}
                    {userDetails.lastName.charAt(0).toUpperCase() + userDetails.lastName.slice(1)}
                  </h3>
                  <p className="italic">{userDetails.email}</p>
                  <p>{userDetails.telephone}</p>
                </div>
              </div>
            </div>
              <h2 className="w-[45%] flex items-end text-3xl font-extrabold">
                You are seeing<p className="text-[#0d2ec7] ml-1.5 mr-0.5">{userDetails.name.charAt(0).toUpperCase()}</p>{userDetails.name.slice(1)} tasks
              </h2>
          </div>
        {/* <div className="ml-80">
          <ul className="mt-20">
            {
              userTasks.length ? (
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
              )
            }
          </ul>
        </div> */}
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
