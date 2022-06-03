import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Primary } from "../styles/Buttons";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0()
  return (
   <button onClick={() => loginWithRedirect()} className={Primary()}>Log in</button>
  );
};

export default LoginButton;