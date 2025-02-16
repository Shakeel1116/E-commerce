import { useState } from "react";
import { Link } from "react-router";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
    alert(`Password reset link sent to ${email}`);
  };

  return (
    <div className="container">
      <div className="forgot-box">
        <h2>Forgot Password</h2>
        <form onSubmit={handleReset}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Link</button>
        </form>
        <p>
          Remembered? <Link to="/Login"><a>Login</a></Link> 
          </p>
      </div>
    </div>
  );
}
