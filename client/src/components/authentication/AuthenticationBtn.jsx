import React from 'react';

import LoginButton from './LoginButton';
import LogoutButton from './LogOutButton';

import { useAuth0 } from '@auth0/auth0-react';

const AuthenticationButton = () => {
  const { isAuthenticated } = useAuth0();
  // return isAuthenticated ? <LogoutButton /> : <LoginButton />;
  return <LoginButton />
};

export default AuthenticationButton;