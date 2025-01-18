// import React, { createContext, useContext, useState, useEffect } from "react";
// import { useCookies } from "react-cookie";
// import { useNavigate } from "react-router-dom";

// // Define types for user info and context
// interface UserInfo {
//   firstName: string;
//   lastName: string;
//   email: string;
//   _id: string;
// }

// interface AuthContextType {
//   logOut: () => void;
//   isAuthenticated: boolean;
//   setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
//   userInfo: UserInfo;
//   setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// const AuthenticateProvider: React.FC = ({ children }) => {
//   // State to hold user info and authentication status
//   const [userInfo, setUserInfo] = useState<UserInfo>({
//     firstName: "",
//     lastName: "",
//     email: "",
//     _id: "",
//   });
//   const [cookies, setCookie, removeCookie] = useCookies(["token"]);
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!cookies.token);
//   const navigate = useNavigate();

//   // Log out function
//   const logOut = async () => {
//     try {
//       const response = await fetch("/auth/logout", {
//         method: "GET",
//         credentials: "include", // Include cookies with the request
//       });
//       if (response.ok) {
//         removeCookie("token", { path: "/" });
//         setUserInfo({
//           firstName: "",
//           lastName: "",
//           email: "",
//           _id: "",
//         });
//         setIsAuthenticated(false);
//         navigate(1); // Refresh the page after logout
//       }
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   // Effect to fetch user info if authenticated
//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       try {
//         const response = await fetch("/auth/user", {
//           method: "GET",
//           credentials: "include", // Send cookies with the request
//         });
//         const data = await response.json();
//         const { status, userInfo } = data;
//         setUserInfo(userInfo);
//         if (status) {
//           setIsAuthenticated(true);
//         } else {
//           logOut();
//         }
//       } catch (error) {
//         console.error("Failed to fetch user info:", error);
//         logOut(); // If fetching fails, log the user out
//       }
//     };

//     if (isAuthenticated) {
//       fetchUserInfo();
//     }
//   }, [isAuthenticated]);

//   // Navigate to the login page if not authenticated
//   const handleLoginClick = () => {
//     navigate("/auth/login");
//   };

//   return (
//     <AuthContext.Provider
//       value={{ logOut, isAuthenticated, setIsAuthenticated, userInfo, setUserInfo }}
//     >
//       {children}

//       {/* Add Login/Logout button */}
//       <div className="fixed bottom-4 right-4 z-50">
//         {isAuthenticated ? (
//           <button
//             onClick={logOut}
//             className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
//           >
//             Log Out
//           </button>
//         ) : (
//           <button
//             onClick={handleLoginClick}
//             className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
//           >
//             Log In
//           </button>
//         )}
//       </div>
//     </AuthContext.Provider>
//   );
// };

// export default AuthenticateProvider;

// // Custom hook to use authentication context
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthenticateProvider");
//   }
//   return context;
// };






// import React, { createContext, useContext, useState, useEffect } from "react";

// // JWT Context
// interface AuthContextProps {
//   token: string | null;
//   setToken: (token: string | null) => void;
//   isAuthenticated: boolean;
//   setIsAuthenticated: (auth: boolean) => void;
// }

// const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// // Auth Provider
// export const AuthenticateProvider: React.FC = ({ children }) => {
//   const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);

//   useEffect(() => {
//     if (token) {
//       localStorage.setItem("token", token);
//     } else {
//       localStorage.removeItem("token");
//     }
//   }, [token]);

//   return (
//     <AuthContext.Provider value={{ token, setToken, isAuthenticated, setIsAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom Hook to use the auth context
// export const useAuth = (): AuthContextProps => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within AuthenticateProvider");
//   }
//   return context;
// };




import React, { useState, ReactNode } from 'react';
import { AuthContext, AuthContextType } from '../contexts/AuthContext';  // Import the context


// Provider component that wraps the app and provides authentication state
export const AuthenticateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = (email: string, password: string) => {
    if (email && password) {
      setIsAuthenticated(true);
      console.log('User authenticated:', true);  
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  // Define the authContextValue using AuthContextType
  const authContextValue: AuthContextType = {
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthenticateProvider;