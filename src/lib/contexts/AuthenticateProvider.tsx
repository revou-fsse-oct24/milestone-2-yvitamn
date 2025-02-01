


import { useState, useEffect, ReactNode } from 'react';
import { AuthContext, AuthContextType } from './AuthContext';  // Import the context
import { decodeJwt } from '../auth/jwt';
import { useRouter } from 'next/router';

// Provider component that wraps the app and provides authentication state
export const AuthenticateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const router = useRouter();

// Check for JWT token on page load (useEffect to run on mount)
useEffect(() => {
  const token = localStorage.getItem('token'); // You could also check cookies if using SSR
  if (token) {
    const decoded = decodeJwt(token);
    if (decoded) {
      setUser({ email: decoded.email, name: decoded.name });
      setIsAuthenticated(true);
    }
  }
}, []);

const login = (token: string) => {
  // Save the JWT token to local storage or cookie (or both)
  localStorage.setItem('token', token);
  const decoded = decodeJwt(token);
  if (decoded) {
    setUser({ email: decoded.email, name: decoded.name });
    setIsAuthenticated(true);
  }
};

const logout = () => {
  // Clear token and user state
  localStorage.removeItem('token');
  setUser(null);
  setIsAuthenticated(false);
  router.push('/login'); // Redirect to login page
};

  // Define the authContextValue using AuthContextType
  const authContextValue: AuthContextType = {
    isAuthenticated,
    login,
    logout,
    user,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthenticateProvider;