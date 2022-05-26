import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0()
  return (
    <button onClick={() => loginWithRedirect()} className={button}>Log in</button>
  );
};

const button = `
  font-bold text-white
  bg-sky-500
  w-32 h-10 p-0 m-0
  border-2 border-sky-500
  hover:border-sky-600 hover:bg-sky-600
  active:border-sky-700 active:bg-sky-700
  rounded-3xl
`;

export default LoginButton;