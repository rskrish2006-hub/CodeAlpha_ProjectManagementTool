import { FolderKanban, BarChart3, Users, Moon, Zap } from "lucide-react";
import "../styles/landing.css";

const Landing = ({ onStart }) => {
  return (
    <div className="landing">
      <nav className="landing-nav">
        <h2><FolderKanban /> TaskFlow Pro</h2>
        <button onClick={onStart}>Get Started</button>
      </nav>

      <section className="hero">
        <h1>Plan. Track. Deliver.</h1>
        <p>
          A modern project management platform built by Sri Krishna Bhargava
          for teams, tasks, analytics and productivity.
        </p>
        <button onClick={onStart}>Start Managing Projects</button>
      </section>

      <section className="features">
        <div><BarChart3 /><h3>Analytics</h3><p>Track productivity with charts.</p></div>
        <div><FolderKanban /><h3>Kanban</h3><p>Manage tasks with drag and drop.</p></div>
        <div><Users /><h3>Teams</h3><p>Organize members and workflows.</p></div>
        <div><Moon /><h3>Dark Mode</h3><p>Premium light and dark themes.</p></div>
        <div><Zap /><h3>Fast UI</h3><p>Built with React and modern tools.</p></div>
      </section>

      <footer>
        © 2026 TaskFlow Pro — Designed & Developed by Sri Krishna Bhargava
      </footer>
    </div>
  );
};

export default Landing;