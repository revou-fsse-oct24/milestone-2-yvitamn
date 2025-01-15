import React, { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

// Define types for user info and context
interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  _id: string;
}

interface AuthContextType {
  logOut: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: UserInfo;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthenticateProvider: React.FC = ({ children }) => {
  // State to hold user info and authentication status
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: "",
    lastName: "",
    email: "",
    _id: "",
  });
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!cookies.token);
  const navigate = useNavigate();

  // Log out function
  const logOut = async () => {
    try {
      const response = await fetch("/auth/logout", {
        method: "GET",
        credentials: "include", // Include cookies with the request
      });
      if (response.ok) {
        removeCookie("token", { path: "/" });
        setUserInfo({
          firstName: "",
          lastName: "",
          email: "",
          _id: "",
        });
        setIsAuthenticated(false);
        navigate(1); // Refresh the page after logout
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Effect to fetch user info if authenticated
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("/", {
          method: "GET",
          credentials: "include", // Send cookies with the request
        });
        const data = await response.json();
        const { status, userInfo } = data;
        setUserInfo(userInfo);
        if (status) {
          setIsAuthenticated(true);
        } else {
          logOut();
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        logOut(); // If fetching fails, log the user out
      }
    };

    if (isAuthenticated) {
      fetchUserInfo();
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ logOut, isAuthenticated, setIsAuthenticated, userInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthenticateProvider;

// Custom hook to use authentication context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthenticateProvider");
  }
  return context;
};
