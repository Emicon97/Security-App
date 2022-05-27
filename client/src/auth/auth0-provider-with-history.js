// import React from 'react';
// import { useNavigate } from "react-router-dom";
// import { Auth0Provider } from '@auth0/auth0-react';
// const Auth0ProviderWithHistory = ({ children }) => {
//   const domain = "dev-ib0nyaqv.us.auth0.com"
//   const clientId = "fOR9cYEmOqtFI8XCo4xdQdONY7sQ07cg"
//   const navigate = useNavigate();
//   const onRedirectCallback = (appState) => {
//     navigate.push(appState?.returnTo || window.location.pathname);
//   };
//   return (
//     <Auth0Provider
//       domain={domain}
//       clientId={clientId}
//       redirectUri={window.location.origin}
//       onRedirectCallback={onRedirectCallback}
//     >
//       {children}
//     </Auth0Provider>
//   );
// };

// export default Auth0ProviderWithHistory;