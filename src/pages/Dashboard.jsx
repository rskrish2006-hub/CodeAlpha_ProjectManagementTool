import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import Analytics from "../components/analytics/Analytics";
import KanbanBoard from "../components/kanban/KanbanBoard";
import ProjectModal from "../components/modals/ProjectModal";
import toast from "react-hot-toast";
import TeamMembers from "../components/TeamMembers";

const defaultProjects = [
  { name: "AI Career Mentor", progress: 95, tasks: 18 },
  { name: "Stock Portfolio Tracker", progress: 80, tasks: 12 },
  { name: "Personal Finance Tracker", progress: 75, tasks: 10 },
  { name: "TaskFlow Pro", progress: 55, tasks: 16 },
];

const recentTasks = [
  { title: "Build Login Page", status: "Completed", priority: "High" },
  { title: "Create Dashboard UI", status: "In Progress", priority: "Medium" },
  { title: "Implement Charts", status: "Pending", priority: "Low" },
];

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem("projects"));
    setProjects(savedProjects || defaultProjects);
  }, []);

  const saveProjects = (updatedProjects) => {
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };

  const handleAddProject = () => {
    if (!projectName.trim()) {
      alert("Please enter a project name.");
      return;
    }

    const newProject = {
      name: projectName,
      progress: 0,
      tasks: 0,
    };

    const updatedProjects = [...projects, newProject];
    saveProjects(updatedProjects);
    toast.success("Project added successfully!");
    setProjectName("");
    setShowModal(false);
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Navbar
          onNewProject={() => setShowModal(true)}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* Stats */}

        <section className="stats-grid">
          <div className="stat-card">
            <h3>{projects.length}</h3>
            <p>Total Projects</p>
          </div>

          <div className="stat-card">
            <h3>56</h3>
            <p>Total Tasks</p>
          </div>

          <div className="stat-card">
            <h3>38</h3>
            <p>Completed</p>
          </div>

          <div className="stat-card">
            <h3>92%</h3>
            <p>Productivity</p>
          </div>
        </section>

        {/* Charts */}

        <Analytics />

        {/* Projects */}

        <section className="content-grid">
          <div className="panel">
            <h2>Active Projects</h2>

            {projects.map((project, index) => (
              <div className="project-card" key={index}>
                <div>
                  <h3>{project.name}</h3>
                  <p>{project.tasks} Tasks</p>
                </div>

                <div className="progress">
                  <span>{project.progress}%</span>

                  <div>
                    <b
                      style={{
                        width: `${project.progress}%`,
                      }}
                    ></b>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Tasks */}

          <div className="panel">
            <h2>Recent Tasks</h2>

            {recentTasks.map((task, index) => (
              <div className="task-card" key={index}>
                <div>
                  <h3>{task.title}</h3>
                  <p>{task.status}</p>
                </div>

                <span
                  className={`priority ${task.priority.toLowerCase()}`}
                >
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Kanban */}
        <TeamMembers />
        <KanbanBoard searchTerm={searchTerm} />
      </main>

      {showModal && (
        <ProjectModal
          projectName={projectName}
          setProjectName={setProjectName}
          onClose={() => setShowModal(false)}
          onSave={handleAddProject}
        />
      )}
    </div>
  );
};

export default Dashboard;