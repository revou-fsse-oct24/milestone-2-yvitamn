import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  // State for holding form values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State for form validation errors
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // State for loading/error messages after form submission
  const [message, setMessage] = useState<string | null>(null);

  // Basic validation for fields
  /** This function ensures all fields are filled and validates email format.
   * @returns {boolean} - Returns true if form is valid, false otherwise.
   */
  const validate = (): boolean => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
    let isValid = true;

    if (!firstName) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }
    if (!lastName) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  /**
   * Handles the form submission
   * This function triggers the form validation and sends the sign-up request.
   * @param e - The form submission event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh/reload

    // Validate form fields before sending the API request
    if (!validate()) return; // If validation fails, exit early

    const user = { firstName, lastName, email, password };

    // API request to sign up
    fetch("https://fakeapi.platzi.com/en/rest/auth-jwt/signup", {
      method: "POST", // Send data to the server
      headers: {
        "Content-Type": "application/json", // Set request type as JSON
      },
      body: JSON.stringify(user), // Send the user data as JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Sign up failed");
        }
        return response.json(); // Parse the JSON response if success
      })
      .then(() => {
        setMessage("Your account has been created! Redirecting to login...");
        setTimeout(() => {
          navigate("/auth/login"); // Navigate to the login page after a delay
        }, 2000);
      })
      .catch((error) => {
        setMessage("Something went wrong. Please try again.");
        console.error(error);
      });
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Sign Up</h1>

      {/* Form to capture user details */}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        {/* First Name */}
        <div className="mb-4">
          <label htmlFor="firstName" className="block">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} // Update first name
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          {errors.firstName && <span className="text-red-500">{errors.firstName}</span>}
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label htmlFor="lastName" className="block">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)} // Update last name
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          {errors.lastName && <span className="text-red-500">{errors.lastName}</span>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          {errors.email && <span className="text-red-500">{errors.email}</span>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          {errors.password && <span className="text-red-500">{errors.password}</span>}
        </div>

        {/* Submit button */}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Sign Up</button>
        
        {/* Link to Login */}
        <p className="mt-4 text-center">
          Already have an account? <a href="/auth/login" className="text-blue-600">Login</a>
        </p>
      </form>

      {/* Display message */}
      {message && (
        <div className="mt-4 text-center">
          <p className={message === "Your account has been created!" ? "text-green-500" : "text-red-500"}>
            {message}
          </p>
        </div>
      )}
    </div>
  );
};

export default Signup;