// import React, { useState, FormEvent } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthenticateProvider";

// // Define types for the form's errors
// interface Errors {
//   email: string;
//   password: string;
// }

// const Login: React.FC = () => {
//   const navigate = useNavigate();
//   const { setIsAuthenticated, setToken } = useAuth();

//   // State for the form fields
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");

//   // State for errors
//   const [errors, setErrors] = useState<Errors>({ email: "", password: "" });

//   // Basic form validation function
//   const validate = (): boolean => {
//     let valid = true;

//     if (!email) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         email: "Email is required",
//       }));
//       valid = false;
//     }

//     if (!password) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         password: "Password is required",
//       }));
//       valid = false;
//     }

//     return valid;
//   };

//   // Handle form submission using async/await with try/catch
//   const handleSubmit = async (e: FormEvent): Promise<void> => {
//     e.preventDefault(); // Prevent page refresh

//     // Run basic validation
//     if (!validate()) return;

//     const jsonUser = JSON.stringify({ email, password });

//     try {
//       // Making the API request using fetch with async/await
//       const response = await fetch("https://fakeapi.platzi.com/en/rest/auth-jwt/login", {
//         method: "POST", // We're sending a POST request
//         headers: {
//           "Content-Type": "application/json", // Telling the server we're sending JSON data
//         },
//         body: jsonUser, // Sending the credentials as JSON in the request body
//       });

//       if (!response.ok) {
//         // If the response status is not OK (200-299)
//         throw new Error("Login failed");
//       }

//       const data = await response.json(); // Parse the response body as JSON

//       setIsAuthenticated(true); // Set user as authenticated
//       setToken(data.token); // Store token in context

//       // Store token in localStorage for persistence
//       localStorage.setItem("token", data.token);

//       // Redirect to home page after successful login
//       setTimeout(() => {
//         navigate("/", { replace: true });
//       }, 500);

//     } catch (err) {
//       // Handle any errors that occurred during the fetch or parsing
//       console.error("Login error:", err);

//       // Set a generic error message
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         email: "Invalid credentials", // You can adjust the error message as needed
//         password: "Invalid credentials", // Same for password
//       }));
//     }
//   };

//   return (
//     <div className="wrapper dark:text-gray-100">
//       <div className="p-8 mt-16 w-full bg-lightColor-100 border-4 border-lightColor-300 dark:border-grayshade-300 dark:bg-grayshade-400 rounded-lg">
//         <div className="text-center mb-4">
//           <h1 className="text-purpleshade-400 font-extrabold text-4xl mb-3">
//             Login
//           </h1>
//         </div>

//         {/* Show error message if any */}
//         {errors.email && <p className="text-red-500 mb-4">{errors.email}</p>}
//         {errors.password && <p className="text-red-500 mb-4">{errors.password}</p>}

//         <form onSubmit={handleSubmit} className="max-w-md mx-auto">
//           <div className="form-section mb-4">
//             <label htmlFor="email" className="block text-lg font-semibold">
//               Email Address
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-3 border rounded-md border-gray-300 dark:bg-gray-600 dark:border-gray-500"
//             />
//           </div>

//           <div className="form-section mb-4">
//             <label htmlFor="password" className="block text-lg font-semibold">
//               Password
//             </label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 border rounded-md border-gray-300 dark:bg-gray-600 dark:border-gray-500"
//             />
//           </div>

//           <div className="form-section items-center mt-4">
//             <button
//               type="submit"
//               className="w-full p-3 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
//             >
//               Login
//             </button>
//             <div className="mt-4 text-center">
//               <Link to="/auth/signup" className="text-purple-500 hover:underline">
//                 Don't have an account? Sign Up
//               </Link>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

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

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h1>Welcome, you are logged in!</h1>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <div>
          <h1>Please log in</h1>
          <button onClick={handleLogin}>Log In</button>
        </div>
      )}
    </div>
  );
};

export default Login;
