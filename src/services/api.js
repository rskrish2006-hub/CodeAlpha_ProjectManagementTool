const PROJECTS_KEY = "taskflow_projects";
const TASKS_KEY = "taskflow_tasks";

const defaultProjects = [
  {
    id: 1,
    name: "TaskFlow Pro",
    description: "Project management dashboard",
    status: "Active",
  },
];

const defaultTasks = [
  {
    id: 1,
    title: "Design dashboard UI",
    status: "todo",
    priority: "High",
  },
  {
    id: 2,
    title: "Create Kanban board",
    status: "inprogress",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Deploy project",
    status: "done",
    priority: "High",
  },
];

const getData = (key, fallback) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : fallback;
};

const saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getProjects = async () => {
  return getData(PROJECTS_KEY, defaultProjects);
};

export const addProjectAPI = async (project) => {
  const projects = getData(PROJECTS_KEY, defaultProjects);
  const newProject = { ...project, id: Date.now() };
  const updated = [...projects, newProject];
  saveData(PROJECTS_KEY, updated);
  return newProject;
};

export const getTasks = async () => {
  return getData(TASKS_KEY, defaultTasks);
};

export const addTaskAPI = async (task) => {
  const tasks = getData(TASKS_KEY, defaultTasks);
  const newTask = { ...task, id: Date.now() };
  const updated = [...tasks, newTask];
  saveData(TASKS_KEY, updated);
  return newTask;
};

export const updateTaskAPI = async (id, task) => {
  const tasks = getData(TASKS_KEY, defaultTasks);
  const updated = tasks.map((t) => (t.id === id ? { ...t, ...task } : t));
  saveData(TASKS_KEY, updated);
  return task;
};

export const deleteTaskAPI = async (id) => {
  const tasks = getData(TASKS_KEY, defaultTasks);
  const updated = tasks.filter((t) => t.id !== id);
  saveData(TASKS_KEY, updated);
  return { success: true };
};

export const registerAPI = async (user) => {
  localStorage.setItem("taskflowUser", JSON.stringify(user));
  return { success: true, user };
};

export const loginAPI = async (user) => {
  localStorage.setItem(
    "taskflowUser",
    JSON.stringify({
      name: "Krishna Bhargava",
      email: user.email,
    })
  );

  return { success: true };
};