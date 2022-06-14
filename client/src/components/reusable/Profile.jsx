import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { getUsersById } from "../../redux/actions";
import { Primary } from "../styles/Buttons";
import EditUser from "../supervisor/EditUser";
import LoginController from "./LoginController";
import './../styles/reusable/Profile.css'

export default function UserProfile({ show }) {
  const dispatch = useDispatch();
  const header = LoginController();
  const [activePic, setActivePic] = useState(false);
  const [activeEdit, setActiveEdit] = useState(false);
  const user = useSelector((state) => state.userDetails[0]);
  const hierarchy = localStorage.getItem('user');
  const urlImg = "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png";
  const id = localStorage.getItem('id');

  const togglePic = () => {
    setActivePic(!activePic);
  };
  const toggleEdit = () => {
    setActiveEdit(!activeEdit);
  };
  useEffect(() => {
    dispatch(getUsersById(id, header));
  }, [dispatch]);
  return (
    <>
    { user && <>
      <div className={`flex justify-center items-center fixed top-16 right-0 bottom-0 ${show ? 'left-[245px]' : 'left-[87px]'} ease-in-out transition-all duration-700`}>
        <div id="screen-profile">
          
          <button className="edit" onClick={toggleEdit}>Edit</button>
          
          <div className="img" onClick={togglePic}>
            <img src={user.profilePic ? user.profilePic : urlImg} alt="" />          
          </div>

          <h3>{`${user.name} ${user.lastName}`}</h3>
          <h4>{user.telephone}</h4>
          <h5>{user.email}</h5>

        </div>

      </div>

      <Modal active={activePic} toggle={togglePic}>
        <img
          className="w-80 h-80 rounded-full m-5"
          src={user.profilePic ? user.profilePic : urlImg}
          alt="Foto de perfil"
        />
      </Modal>
      <Modal active={activeEdit} toggle={toggleEdit}>
        <EditUser user={user} hierarchy={hierarchy}></EditUser>
      </Modal>
    </>
    }
    </>
  );
}

const Image = () => `
  rounded-full 
  border-4 border-white
  ring-4 ring-[#0243EC]
  m-5
`;
