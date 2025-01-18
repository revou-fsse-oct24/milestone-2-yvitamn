
<<<<<<< HEAD

import  { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth'; // Import the custom hook
//import { useAuth } from '../contexts/AuthenticateProvider';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { isAuthenticated, login, logout } = useAuth(); // Access auth functions
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login(email, password); // Use login function from context
    } else {
      setError('Please enter both email and password');
    }
  };

  useEffect(() => {
    // Redirect to '/products' page after successful login
    if (isAuthenticated) {
      navigate('/products');
    }
  }, [isAuthenticated, navigate]); // This effect will run when isAuthenticated changes
=======
// import React, { useState, FormEvent } from "react";
// import { useNavigate } from "react-router-dom";
// import  useAuth from "../hooks/useAuth"; // Import the custom hook

// const Login: React.FC = () => {
//   const navigate = useNavigate();
//   const { setIsAuthenticated, setToken } = useAuth(); // Access authentication functions from context

//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [error, setError] = useState<string>("");

//   // Basic form validation
//   const validate = (): boolean => {
//     if (!email || !password) {
//       setError("Both fields are required");
//       return false;
//     }
//     setError(""); // Reset error message
//     return true;
//   };

//   // Handle form submission
//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     if (!validate()) return;

//     const jsonUser = JSON.stringify({ email, password });

//     try {
//       const response = await fetch("https://fakeapi.platzi.com/en/rest/auth-jwt/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: jsonUser,
//       });

//       if (!response.ok) throw new Error("Login failed");

//       const data = await response.json();
//       setIsAuthenticated(true); // Mark user as authenticated
//       setToken(data.token); // Save the token in context

//       // Optionally, store token in localStorage or cookies for persistence
//       localStorage.setItem("token", data.token);

//       // Redirect to home page after successful login
//       navigate("/", { replace: true });
//     } catch (err) {
//       setError("Invalid credentials"); // Display error message
//       console.error(err);
//     }
//   };

//   return (
//     <div className="wrapper">
//       <form onSubmit={handleSubmit}>
//         <div className="form-section">
//           <label htmlFor="email">Email Address</label>
//           <input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         <div className="form-section">
//           <label htmlFor="password">Password</label>
//           <input
//             id="password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>

//         {error && <p className="error">{error}</p>}

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import React from "react";
import useAuth from "../hooks/useAuth";
// import { useAuth } from '../contexts/AuthenticateProvider';  // Adjust the import based on your file structure

const Login = () => {
  const { isAuthenticated, login, logout } = useAuth();

  const handleLogin = () => {
    login(); // Call the login function to set isAuthenticated to true
  };

  const handleLogout = () => {
    logout(); // Call the logout function to set isAuthenticated to false
  };
>>>>>>> fix/suggestion

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h1>You're logged in!</h1>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Please login</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
