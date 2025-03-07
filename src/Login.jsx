import { useState } from "react";
import "./LoginStyle.css";

import {login} from "./FetchFunctions.js"

export function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
    // Handle authentication logic here
    login(formData.username, formData.password);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <div className="input-group">
          <label>Email</label>
          <input
            type="text"
            name="username"
            placeholder="Enter email"
            value={formData.username}
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
          Not registered? <button className="signup-button">Sign Up</button>
        </p>
      </form>
    </div>
  );
};

export default Login;