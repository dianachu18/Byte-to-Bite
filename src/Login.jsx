import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginStyle.css";

import {login} from "./FetchFunctions.js"

export function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Create the navigate function
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
    // Handle authentication logic here
    login(formData.email, formData.password)
    .then((response) => {
      // After a successful login, navigate to SearchPage
      navigate("/SearchPage");
    })
    .catch((error) => {
      console.error("Login failed:", error);
      // Optionally, handle login errors here
    });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <div className="input-group">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
        <span>-------------------------------------------------------</span>
        <p className="signup-message">
          Not registered? <button type="button" className="signup-button" onClick={() => navigate("/SignUp")}>Sign Up</button>
        </p>
      </form>
    </div>
  );
};

export default Login;