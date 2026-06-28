import { useEffect, useState } from "react";
import {
  getProjects,
  addProjectAPI,
  getTasks,
  addTaskAPI,
  updateTaskAPI,
  deleteTaskAPI,
  registerAPI,
  loginAPI,
} from "./services/api";
import {
  Search, Plus, Bell, User, LogOut, Moon, Sun,
  Trash2, Pencil, FolderKanban,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import toast, { Toaster } from "react-hot-toast";
import Landing from "./pages/Landing";
import "./styles/dashboard.css";
import "./styles/landing.css";

const columns = ["Todo", "In Progress", "Review", "Done"];

const weeklyData = [
  { day: "Mon", tasks: 4 }, { day: "Tue", tasks: 7 },
  { day: "Wed", tasks: 5 }, { day: "Thu", tasks: 9 },
  { day: "Fri", tasks: 6 }, { day: "Sat", tasks: 3 },
];

const pieData = [
  { name: "Completed", value: 45 },
  { name: "In Progress", value: 30 },
  { name: "Pending", value: 25 },
];

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("taskflowUser"));
  const [showLanding, setShowLanding] = useState(!localStorage.getItem("taskflowUser"));
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [projectName, setProjectName] = useState("");
  const [task, setTask] = useState({ title: "", status: "Todo", priority: "Medium", date: "" });
  const [editingId, setEditingId] = useState(null);
  const [isRegister, setIsRegister] = useState(false);
  const [authData, setAuthData] = useState({
  name: "",
  email: "",
  password: "",
  });
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const backendProjects = await getProjects();
        const backendTasks = await getTasks();
        setProjects(backendProjects);
        setTasks(backendTasks);
      } catch {
        toast.error("Backend not connected");
      }
    };

    if (loggedIn) loadData();
  }, [loggedIn]);

 const login = async () => {
  const result = await loginAPI({
    email: authData.email || "krishna@taskflow.com",
    password: authData.password || "123456",
  });

  if (result.success) {
    const user = JSON.parse(localStorage.getItem("taskflowUser"));
    setLoggedIn(user);
    setShowLanding(false);
    toast.success("Login successful");
  } else {
    toast.error(result.message || "Login failed");
  }
};

const register = async () => {
  const result = await registerAPI(authData);

  if (result.user) {
    toast.success("Registered successfully. Now login.");
    setIsRegister(false);
  } else {
    toast.error(result.message || "Register failed");
  }
};

  const logout = () => {
    localStorage.removeItem("taskflowUser");
    setLoggedIn(false);
    setShowLanding(true);
  };

  const addProject = async () => {
  if (!projectName.trim()) return toast.error("Enter project name");

  const newProject = await addProjectAPI({
    name: projectName,
    progress: 0,
    tasks: 0,
  });

  setProjects([...projects, newProject]);
  setProjectName("");
  toast.success("Project added");
  };
  const saveTask = async () => {
    if (!task.title.trim()) return toast.error("Enter task title");

    if (editingId) {
      await updateTaskAPI(editingId, task);
      setTasks(tasks.map((t) => (t.id === editingId ? { ...task, id: editingId } : t)));
      setEditingId(null);
      toast.success("Task updated");
    } else {
      const newTask = await addTaskAPI(task);
      setTasks([...tasks, newTask]);
      toast.success("Task added");
    }

    setTask({ title: "", status: "Todo", priority: "Medium", date: "" });
  };

  const editTask = (t) => {
    setTask(t);
    setEditingId(t.id);
  };

  const deleteTask = async (id) => {
    await deleteTaskAPI(id);
    setTasks(tasks.filter((t) => t.id !== id));
    toast.success("Task deleted");
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const updatedTasks = tasks.map((t) =>
      t.id === result.draggableId
        ? { ...t, status: result.destination.droppableId }
        : t
    );

    setTasks(updatedTasks);

    const movedTask = updatedTasks.find((t) => t.id === result.draggableId);
    await updateTaskAPI(result.draggableId, movedTask);
  };

  if (showLanding && !loggedIn) {
    return <Landing onStart={() => setShowLanding(false)} />;
  }

  if (!loggedIn) {
  return (
    <div className="login-page">
      <Toaster position="top-right" />

      <div className="login-left">
        <FolderKanban size={50} />
        <h1>TaskFlow Pro</h1>
        <h2>Plan. Track. Deliver.</h2>
        <p>
          A premium project management dashboard built for teams, tasks,
          analytics and productivity.
        </p>
      </div>

      <div className="login-card">
        <h2>{isRegister ? "Create Account" : "Welcome Back"}</h2>

        {isRegister && (
          <input
            placeholder="Full name"
            value={authData.name}
            onChange={(e) =>
              setAuthData({ ...authData, name: e.target.value })
            }
          />
        )}

        <input
          placeholder="Email"
          value={authData.email}
          onChange={(e) =>
            setAuthData({ ...authData, email: e.target.value })
          }
        />

        <input
          placeholder="Password"
          type="password"
          value={authData.password}
          onChange={(e) =>
            setAuthData({ ...authData, password: e.target.value })
          }
        />

        <button onClick={isRegister ? register : login}>
          {isRegister ? "Register" : "Login to Dashboard"}
        </button>

        <p className="auth-switch">
          {isRegister ? "Already have an account?" : "New user?"}
          <span onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? " Login" : " Register"}
          </span>
        </p>
      </div>
    </div>
    );
  }
  return (
    <div className="app">
      <Toaster position="top-right" />

      <aside className="sidebar">
        <h2>TaskFlow Pro</h2>
        <p>Dashboard</p>
        <p>Projects</p>
        <p>Tasks</p>
        <p>Team</p>
        <p>Settings</p>
      </aside>

      <main className="main">
        <nav className="navbar">
          <div>
            <h1>Project Dashboard</h1>
            <p>Manage projects, tasks and workflow</p>
          </div>

          <div className="nav-actions">
            <div className="search">
              <Search size={18} />
              <input placeholder="Search tasks..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <Bell />
            <div className="profile"><User size={18} /> Krishna</div>
            <button onClick={logout}><LogOut size={18} /></button>
          </div>
        </nav>

        <section className="stats">
          <div><h3>{projects.length}</h3><p>Projects</p></div>
          <div><h3>{tasks.length}</h3><p>Tasks</p></div>
          <div><h3>{tasks.filter((t) => t.status === "Done").length}</h3><p>Completed</p></div>
          <div><h3>92%</h3><p>Productivity</p></div>
        </section>

        <section className="charts">
          <div className="card">
            <h2>Weekly Productivity</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklyData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="tasks" stroke="#2563eb" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h2>Task Overview</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={85} label>
                  <Cell fill="#2563eb" />
                  <Cell fill="#f59e0b" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="grid">
          <div className="card">
            <h2>Active Projects</h2>
            <div className="add-row">
              <input placeholder="New project name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
              <button onClick={addProject}><Plus size={16} /> Add</button>
            </div>

            {projects.map((p) => (
              <div className="project" key={p.id}>
                <div>
                  <h3>{p.name}</h3>
                  <p>{p.tasks} tasks</p>
                </div>
                <span>{p.progress}%</span>
              </div>
            ))}
          </div>

          <div className="card">
            <h2>{editingId ? "Edit Task" : "Add Task"}</h2>
            <input placeholder="Task title" value={task.title} onChange={(e) => setTask({ ...task, title: e.target.value })} />

            <select value={task.status} onChange={(e) => setTask({ ...task, status: e.target.value })}>
              {columns.map((c) => <option key={c}>{c}</option>)}
            </select>

            <select value={task.priority} onChange={(e) => setTask({ ...task, priority: e.target.value })}>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <input type="date" value={task.date} onChange={(e) => setTask({ ...task, date: e.target.value })} />
            <button onClick={saveTask}>{editingId ? "Update Task" : "Add Task"}</button>
          </div>
        </section>

        <section className="card">
          <h2>Kanban Board</h2>
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="kanban">
              {columns.map((col) => (
                <Droppable droppableId={col} key={col}>
                  {(provided) => (
                    <div className="column" ref={provided.innerRef} {...provided.droppableProps}>
                      <h3>{col}</h3>

                      {tasks
                        .filter((t) => t.status === col)
                        .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
                        .map((t, index) => (
                          <Draggable draggableId={t.id} index={index} key={t.id}>
                            {(provided) => (
                              <div className="task" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                <div className="task-top">
                                  <span className={t.priority.toLowerCase()}>{t.priority}</span>
                                  <div>
                                    <button onClick={() => editTask(t)}><Pencil size={14} /></button>
                                    <button onClick={() => deleteTask(t.id)}><Trash2 size={14} /></button>
                                  </div>
                                </div>
                                <h4>{t.title}</h4>
                                <p>Due: {t.date}</p>
                              </div>
                            )}
                          </Draggable>
                        ))}

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>
        </section>

        <section className="team card">
          <h2>Team Members</h2>
          <div>
            <span>KB</span><span>RK</span><span>AN</span><span>UI</span>
          </div>
        </section>
      </main>
    </div>
  );

}
export default App;