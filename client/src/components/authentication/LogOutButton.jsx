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
  flex flex-row justify-evenly items-center
  h-10 w-28
  text-white font-semibold
  rounded-md
  bg-red-500
  hover:bg-red-600
  active:bg-red-400 active:ring-4 active:ring-red-200
`;

export default LogOutButton;