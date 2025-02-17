import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 🔄 Check if user is already logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("⚠️ All fields are required!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://e-commerce-3l3n.onrender.com/api/auth/login", 

        {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed!");
      }

      alert(`✅ Login Successful! Welcome, ${data.name}`);
      localStorage.setItem("user", JSON.stringify(data)); // ✅ Store user in localStorage
      setUser(data); // ✅ Update state
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        {!user ? (
          <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        ) : (
          <div className="user-info">
            <h3>✅ Welcome, {user.name}!</h3>
            <p>Email: {user.email}</p>
            <button onClick={() => { localStorage.removeItem("user"); setUser(null); }}>Logout</button>
          </div>
        )}
        {!user && (
          <div className="links">
            <Link to="/forgotpass">Forgot Password?</Link>
            <p>Don&apos;t have an account? <Link to="/signup">Sign Up</Link></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
