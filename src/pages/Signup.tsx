import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  // State for form values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State for form errors
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // State for loading/error messages
  const [message, setMessage] = useState<string | null>(null);

  // Basic validation for fields
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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh

    // Validate form
    if (!validate()) return;

    const user = { firstName, lastName, email, password };

    // API request to sign up
    fetch("https://", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Sign up failed");
        }
        return response.json();
      })
      .then(() => {
        setMessage("Your account has been created! Redirecting to login...");
        setTimeout(() => {
          navigate("/auth/login");
        }, 2000);
      })
      .catch((error) => {
        setMessage("Something went wrong. Please try again.");
        console.error(error);
      });
  };

  return (
    <div className="wrapper">
      <div className="p-8 mt-16 w-full bg-lightColor-100 border-4 border-lightColor-300 rounded-lg">
        <div className="text-center mb-4">
          <h1 className="text-purpleshade-400 font-extrabold text-4xl mb-3">
            Sign Up
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          {/* First Name */}
          <div className="form-section">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input"
            />
            {errors.firstName && <span className="text-red-500">{errors.firstName}</span>}
          </div>

          {/* Last Name */}
          <div className="form-section">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input"
            />
            {errors.lastName && <span className="text-red-500">{errors.lastName}</span>}
          </div>

          {/* Email */}
          <div className="form-section">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
            {errors.email && <span className="text-red-500">{errors.email}</span>}
          </div>

          {/* Password */}
          <div className="form-section">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
            {errors.password && <span className="text-red-500">{errors.password}</span>}
          </div>

          {/* Submit button */}
          <div className="form-section">
            <button type="submit" className="btn">Sign Up</button>
            <p className="mt-4">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-blue-600">Login</Link>
            </p>
          </div>
        </form>

        {/* Message */}
        {message && (
          <div className="mt-4 text-center">
            <p className={message === "Your account has been created!" ? "text-green-500" : "text-red-500"}>
              {message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
