import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { getUsersById } from "../../redux/actions";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const user = useSelector((state) => state.userDetails);
  const { id } = useParams();

  const toggle = () => {
    setActive(!active);
  };

  useEffect(() => {
    dispatch(getUsersById(id));
  }, []);

  return (
    <>
      <div className="grid mt-6">
        <div className="justify-around bg-[#EDF6FE] w-4/5 justify-self-center lg:flex">
          <div className="flex-column justify-center m-4">
            <img
              src="https://thumbs.dreamstime.com/z/guardia-de-seguridad-90118429.jpg"
              alt="foto de perfil"
              width="300rem"
              className="rounded-full overflow-hidden border-solid border-black"
            />
            <button
              onClick={toggle}
              className="rounded-lg border-solid border-2 border-black mr-2 hover:bg-cyan-200 m-4 py-1 px-4"
            >
              Profile Pic
            </button>
          </div>
          <div className="flex-column bg-gray-200 m-6 px-10 py-4 self-center rounded-2xl text-lg leading-10 lg:w-4/5">
            <h2 className={text}>
              {" "}
              <span className={style}>Name: </span> {user.name}
            </h2>
            <h2 className={text}>
              {" "}
              <span className={style}>Last Name: </span> {user.lastName}{" "}
            </h2>
            <h2 className={text}>
              {" "}
              <span className={style}>Email: </span>{" "}
              leomessielmasgrande@gmail.com
            </h2>
            <h2 className={text}>
              {" "}
              <span className={style}>DNI: </span> {user.dni}
            </h2>
            <h2 className={text}>
              {" "}
              <span className={style}>Phone Number: </span> +54 9 351-935-935
            </h2>
            <button className="rounded-lg border-solid border-2 border-black mr-2 hover:bg-cyan-200 px-5">
              Edit
            </button>
          </div>
        </div>
      </div>
      <Modal active={active} toggle={toggle}>
        <div className="flex justify-between w-2/5">
          <img
            className="rounded-full overflow-hidden border-solid border-black justify-self-center"
            src="https://thumbs.dreamstime.com/z/guardia-de-seguridad-90118429.jpg"
            alt="Foto de perfil"
          />
        </div>
      </Modal>
    </>
  );
}

const style = `lg:text-xl text-gray-700 font-bold text-base`;
const text = `text-sm lg:text-lg`;
