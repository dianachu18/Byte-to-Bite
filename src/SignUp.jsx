import { useState } from "react";
import "./SignUp.css";
import { useGlobal } from "./GlobalContext";

export function SignUp() {
  const { addUserInput } = useGlobal();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Record the user input using the global context
    addUserInput(formData);
    console.log("Recent data:", formData);
    // Optionally clear the form after submission
    setFormData({
      email: "",
      username: "",
      password: ""
    });
  };

  return (
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
  );
}

export default SignUp;
