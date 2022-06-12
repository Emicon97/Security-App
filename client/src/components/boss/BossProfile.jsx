import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../reusable/Modal";
import TableEmployees from "./tableEmployees";
import { getEmployees, getUsersById } from "../../redux/actions";
import "./style.css";
import LoginController from "../reusable/LoginController";

export default function BossProfile({show}) {
  const [activePic, setActivePic] = useState(false);
  const [activeEdit, setActiveEdit] = useState(false);
  let dispatch = useDispatch();
  const header = LoginController();
  const id = localStorage.getItem('id');
  let user = useSelector((state) => state.userDetails[0]);
  let supervisors = useSelector((state) => state.employees);
  const togglePic = () => {
    setActivePic(!activePic);
  };
  const toggleEdit = () => {
    setActiveEdit(!activeEdit);
  };
  useEffect(() => {
    dispatch(getUsersById(id, header));
    dispatch(getEmployees(id, header));
  }, [dispatch]);

  return (
    <>
      {user ? (
        <div className={`home-boss fixed top-16 right-0 bottom-0 ${show ? 'left-[245px]' : 'left-[87px]'} ease-in-out transition-all duration-700`}>
          <div className="info-screen">
            <div className="contain-profile">
              <div className="profile">
                <div className="contain-profile-img">
                  <img
                    src={
                      user.profilePic
                        ? user.profilePic
                        : "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                    }
                    alt="foto de perfil"
                    width="300rem"
                    className="pic"
                  />
                  <button className="pruebaa" onClick={togglePic}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div className="contain-profile--info">
                  {/* <div className="button-edit">
                    <button className={Primary()} onClick={toggleEdit}>
                      Edit
                    </button>
                  </div> */}
                  <div className="info">
                    <p>{user ? user.name : "undefined"}</p>
                    <p>{user ? user.lastName : "undefined"}</p>
                    <p>{user ? user.email : "undefined"}</p>
                    <p>{user ? user.telephone : "undefined"}</p>
                    {/* <p>+54 9 351-935-935</p> */}
                  </div>
                </div>
              </div>

              <div className="employees">
                <TableEmployees
                  name={"Employees"}
                  employees={supervisors ? supervisors : []}
                />
              </div>
            </div>
            <Modal active={activePic} toggle={togglePic} id="Profile-pic">
              <img
                className="w-80 h-80 rounded-full m-5"
                src={
                  user.profilePic
                    ? user.profilePic
                    : "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                }
                alt="Foto de perfil"
              />
            </Modal>
            {/* <Modal active={activeEdit} toggle={toggleEdit}>
              <EditUser user={user} id={id}></EditUser>
            </Modal> */}
          </div>
          {/* <Link to="/home/add">
                <button style={{backgroundColor: "blue"}}>Add User</button>
              </Link> */}
        </div>
      ) : (
        <div className="lds-dual-ring"></div>
      )}
    </>
  );
}
