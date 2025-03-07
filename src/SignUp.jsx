//import "./SignUp.css"
import {addUser} from "./FetchFunctions.js"

export function SignUp() {
    addUser("matthew@gmail.com", "matthew", "matthew");
    return (
      <div className="signup-container">
        <form className="signup-form">
          <h1>Sign Up</h1>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />
  
          <label>Username</label>
          <input type="text" placeholder="Enter your username" required />
  
          <label>Password</label>
          <input type="password" placeholder="Enter your password" required />
  
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }

export default SignUp;
  