import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FolderKanban, Lock, Mail } from "lucide-react";
import "../styles/auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("krishna@taskflow.com");
  const [password, setPassword] = useState("123456");

  const handleLogin = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "taskflowUser",
      JSON.stringify({
        name: "Krishna Bhargava",
        email,
      })
    );

    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="brand-box">
          <FolderKanban size={42} />
          <h1>TaskFlow Pro</h1>
        </div>

        <h2>Manage projects like a professional team.</h2>
        <p>
          Plan tasks, track progress, organize teams and build workflows in one
          clean dashboard.
        </p>

        <div className="auth-stats">
          <div>
            <h3>50+</h3>
            <span>Projects</span>
          </div>
          <div>
            <h3>120+</h3>
            <span>Tasks</span>
          </div>
          <div>
            <h3>98%</h3>
            <span>Productivity</span>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <form className="auth-card" onSubmit={handleLogin}>
          <h2>Welcome back</h2>
          <p>Login to continue your workspace</p>

          <label>Email</label>
          <div className="auth-input">
            <Mail size={18} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <label>Password</label>
          <div className="auth-input">
            <Lock size={18} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Login to Dashboard</button>

          <small>Demo login ready. No backend required for now.</small>
        </form>
      </div>
    </div>
  );
};

export default Login;