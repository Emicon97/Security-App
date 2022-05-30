import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { getUsersById } from "../../redux/actions";
import { useParams } from "react-router-dom";

export default function UserProfile() {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.userDetails);
    const { id } = useParams()

    useEffect(() => {
        dispatch(getUsersById(id));
    }, [])

  return (
    <div className="flex justify-around bg-black">
      <div className="flex-column justify-center m-4">
        <img
          src="https://thumbs.dreamstime.com/z/guardia-de-seguridad-90118429.jpg"
          alt="foto de perfil"
          width="300rem"
          className="rounded-full overflow-hidden border-solid border-black"
        />
        <button  className="rounded-lg border-solid border-2 border-inherit mr-2 hover:bg-cyan-200 m-4">Profile Pic</button>
      </div>
      <div className="flex-column bg-gray-200 m-6 px-10 py-4 self-center rounded-2xl text-lg leading-10">
        <h2> <span className={style}>Name: </span> {user.name}</h2>
        <h2> <span className={style}>Last Name: </span> {user.lastName} </h2>
        <h2> <span className={style}>Email: </span>  robertocarlosgarcia@gmail.com</h2>
        <h2> <span className={style}>DNI: </span>  {user.dni}</h2>
        <h2> <span className={style}>Neighborhood watching: </span> San Isidro</h2>

      </div>
    </div>
  );
}

const style = `text-xl text-gray-700 font-bold`;
