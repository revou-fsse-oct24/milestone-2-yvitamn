import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthenticateProvider"; 
import UpdatePassword from "./UpdatePassword"; 

const MyAccount: React.FC = () => {
  // Get current user info from authentication context
  const {
    userInfo: { firstName, lastName, email },
  } = useAuth();

  // State variables to hold form data
  const [formData, setFormData] = useState({
    firstName,
    lastName,
    email,
  });

  // State for handling form validation errors
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Manual validation function
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is not valid";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return; // Stop if validation fails
    }

    // Check if any changes were made
    if (
      formData.firstName === firstName &&
      formData.lastName === lastName &&
      formData.email === email
    ) {
      alert("No changes detected"); // Alert if no changes are made
      return;
    }

    // Prepare updated user info to send
    const updatedInfo = JSON.stringify(formData);

    // Use fetch to send the updated info to the server
    fetch("/user/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set header for JSON payload
      },
      body: updatedInfo, // Send updated user info
    })
      .then((res) => res.json()) // Parse the response as JSON
      .then((data) => {
        if (data.success) {
          alert("Changes applied successfully!"); // Alert on success
        } else {
          alert("Something went wrong"); // Alert on failure
        }
      })
      .catch((err) => {
        console.error("Error:", err); // Log error if fetch fails
        alert("Error updating information. Please try again."); // Alert error message
      });
  };

  return (
    <div className="flex flex-col xl:flex-row">
      {/* Form for updating account details */}
      <form onSubmit={handleSubmit} className="w-full mx-2">
        <h1 className="text-2xl my-12 font-bold text-center xl:text-left">Account Details</h1>
        
        {/* First Name Input */}
        <div className="form-section">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
          />
          {/* Display validation error */}
          <span>{errors.firstName && `*${errors.firstName}`}</span>
        </div>

        {/* Last Name Input */}
        <div className="form-section">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
          />
          {/* Display validation error */}
          <span>{errors.lastName && `*${errors.lastName}`}</span>
        </div>

        {/* Email Input */}
        <div className="form-section">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          {/* Display validation error */}
          <span>{errors.email && `*${errors.email}`}</span>
        </div>

        {/* Submit Button */}
        <div className="form-section items-center md:col-span-2">
          <button type="submit">Submit Details</button>
        </div>
      </form>

      {/* UpdatePassword Component */}
      <UpdatePassword />
    </div>
  );
};

export default MyAccount;
