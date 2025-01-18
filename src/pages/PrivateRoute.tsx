
import React from 'react';
import { Navigate, RouteProps, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Adjust path as needed

const PrivateRoute: React.FC<RouteProps> = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth(); // Get auth status from context

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  //return <>{element}</>; // Otherwise, render the protected route's element
  return <Outlet />;

};

export default PrivateRoute;


