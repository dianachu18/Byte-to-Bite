import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import {addUser} from "./FetchFunctions.js"

export function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup attempt:", formData);
    // Handle authentication logic here
    addUser(formData.email, formData.username, formData.password)
    .then((response) => {
      // Redirect to Login page after a successful signup
        navigate("/");
    })
    .catch((error) => {
      console.error("Signup error:", error);
      // Optionally handle signup errors here
    });
  };

  return (
    <div className="signup-body">
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <label>Email</label>
          <input 
            type="email" 
            name="email" 
            placeholder="Enter your email" 
            value={formData.email}
            onChange={handleChange}
            required 
          />

          <label>Username</label>
          <input 
            type="text" 
            name="username" 
            placeholder="Enter your username" 
            value={formData.username}
            onChange={handleChange}
            required 
          />

          <label>Password</label>
          <input 
            type="password" 
            name="password" 
            placeholder="Enter your password" 
            value={formData.password}
            onChange={handleChange}
            required 
          />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
