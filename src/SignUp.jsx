import "./SignUp.css"

export function SignUp() {
    return (
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form className="signup-form">
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
  