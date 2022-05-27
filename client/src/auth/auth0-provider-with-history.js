import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = "dev-ib0nyaqv.us.auth0.com"
  const clientId = "fOR9cYEmOqtFI8XCo4xdQdONY7sQ07cg"

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri="http://localhost:3000/bossHome"
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;