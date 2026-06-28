import { Bell, Search, Plus, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

const Navbar = ({ onNewProject, searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const user = JSON.parse(localStorage.getItem("taskflowUser")) || {
    name: "Krishna Bhargava",
  };

  const handleLogout = () => {
    localStorage.removeItem("taskflowUser");
    navigate("/");
  };

  return (
    <header className="navbar">
      <div>
        <h1>Project Dashboard</h1>
        <p>Manage projects, tasks and team workflow</p>
      </div>

      <div className="nav-actions">
        <div className="search-box">
          <Search size={18} />
          <input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Bell size={22} />
        <button className="theme-btn" onClick={toggleTheme}>
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <button onClick={onNewProject}>
          <Plus size={18} /> New Project
        </button>

        <div className="profile-box">
          <div className="avatar">
            <User size={18} />
          </div>
          <span>{user.name}</span>
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;