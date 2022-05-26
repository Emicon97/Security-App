import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogOutButton = () => {
  const { logout } = useAuth0();
  return (
    <button onClick={() => logout({ returnTo: window.location.origin })} className={button}>
      Log out
    </button>
  );
};

const button = `
  font-bold text-white
  bg-red-500
  w-32 h-10 p-0 m-0
  border-2 border-red-500
  hover:border-red-600 hover:bg-red-600
  active:border-red-700 active:bg-red-700
  rounded-3xl
`;

export default LogOutButton;