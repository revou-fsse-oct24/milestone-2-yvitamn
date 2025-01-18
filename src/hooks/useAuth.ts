// src/hooks/useAuth.ts

import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

// Custom hook to use authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthenticateProvider");
  }
  return context;
};

export default useAuth;
