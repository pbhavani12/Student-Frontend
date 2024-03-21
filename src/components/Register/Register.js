import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Register = ({ onRegister }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false); // Track form submission
  const navigate = useNavigate();

  const handleRegisterClick = async () => {
    setFormSubmitted(true); // Mark form as submitted

    // Validation checks
    if (!firstname || !lastname || !username || !password) {
      console.error("Please fill in all fields");
      return;
    }

    // Additional validations (e.g., password length, etc.)
    // Example: Check if password length is at least 8 characters
    if (password.length < 8) {
      console.error("Password must be at least 8 characters long");
      return;
    }

    try {
      const response = await fetch("http://localhost:8082/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname, lastname, username, password }),
      });

      if (response.ok) {
        navigate("/login"); // Redirect user on successful registration
      } else {
        console.error("Registration failed"); // Handle registration failure
        // You can add logic here to show an error message to the user
      }
    } catch (error) {
      console.error("Error:", error); // Handle network errors
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="First Name"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        className="input-field"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        className="input-field"
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input-field"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
      />
      {formSubmitted && (!firstname || !lastname || !username || !password) && (
        <p className="error-message">All fields are mandatory</p>
      )}
      <button onClick={handleRegisterClick} className="register-button">
        Register
      </button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
