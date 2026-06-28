import { LayoutDashboard, FolderKanban, CheckSquare, Users, Settings } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2 className="logo">TaskFlow</h2>

      <nav>
        <a className="active"><LayoutDashboard size={20} /> Dashboard</a>
        <a><FolderKanban size={20} /> Projects</a>
        <a><CheckSquare size={20} /> Tasks</a>
        <a><Users size={20} /> Team</a>
        <a><Settings size={20} /> Settings</a>
      </nav>
    </aside>
  );
};

export default Sidebar;