import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthenticateProvider";

// Define types for the form's errors
interface Errors {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  // State for the form fields
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // State for errors
  const [errors, setErrors] = useState<Errors>({ email: "", password: "" });

  // Basic form validation function
  const validate = (): boolean => {
    let valid = true;
    let newErrors: Errors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault(); // Prevent page refresh

    // Run basic validation
    if (!validate()) return;

    const jsonUser = JSON.stringify({ email, password });

    // Making the API request using fetch
    fetch("https://your-api.com/auth/login", {
      method: "POST", // We're sending a POST request
      headers: {
        "Content-Type": "application/json", // Telling the server we're sending JSON data
      },
      body: jsonUser, // Sending the credentials as JSON in the request body
      credentials: "include", // Optional: If you need cookies/session handling
    })
      .then((response) => {
        if (!response.ok) {
          // If the response status is not OK (200-299)
          throw new Error("Login failed");
        }
        return response.json(); // Parse the response body as JSON
      })
      .then((data) => {
        alert("Login successful!"); // Success message
        setIsAuthenticated(true); // Set user as authenticated

        // Redirect to home page after successful login
        setTimeout
