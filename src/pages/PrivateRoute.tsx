
//import React from 'react';
import { Navigate, RouteProps } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; //Custom hook to get auth status
import { useNavigate } from 'react-router-dom';

const PrivateRoute: React.FC<RouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuth(); // Get auth status from context

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{element}</>; // If authenticated, render the protected route's element
  //return <Outlet />;

};

export default PrivateRoute;


