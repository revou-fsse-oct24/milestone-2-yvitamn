


import { useState, ReactNode } from 'react';
import { AuthContext, AuthContextType } from '../contexts/AuthContext';  // Import the context


// Provider component that wraps the app and provides authentication state
export const AuthenticateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  const login = (email: string, password: string) => {
    if (email && password) {
      setIsAuthenticated(true);
      setUser({ email, name: email.split('@')[0] }); // Example of user info
      console.log('User authenticated:', true);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
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