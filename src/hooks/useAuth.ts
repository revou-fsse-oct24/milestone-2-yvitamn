
<<<<<<< HEAD
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';  // Import the context
=======
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
>>>>>>> fix/suggestion

// Custom hook to use authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthenticateProvider");
  }
  return context;
};

<<<<<<< HEAD
export default useAuth;  
=======
export default useAuth;
>>>>>>> fix/suggestion
