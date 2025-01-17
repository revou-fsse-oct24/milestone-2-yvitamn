
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// const PrivateRoute: React.FC = ({ children }) => {
//   const { isAuthenticated } = useAuth();

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return <>{children}</>;
// };

// export default PrivateRoute;


// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthenticateProvider';

// interface PrivateRouteProps {
//   element: JSX.Element;
//   path: string;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, path }) => {
//   const { isAuthenticated } = useAuth();  // Get authentication status from context

//   if (!isAuthenticated) {
//     // If not authenticated, redirect to login page
//     return <Navigate to="/login" replace />;
//   }

//   // If authenticated, render the requested route's component
//   return <Route path={path} element={element} />;
// };

// export default PrivateRoute;

// src/components/PrivateRoute.tsx

import React from 'react';
import { Route, RouteProps, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // assuming you have a context to manage auth state
//import { AuthenticateProvider } from './contexts/AuthenticateProvider'; // Correct import


interface PrivateRouteProps extends RouteProps {
  element: React.ReactNode; // the element that will be rendered if authenticated
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // redirect to login if not authenticated
  }

  return <Route {...rest} element={element} />; // render the element if authenticated
};

export default PrivateRoute;



