const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;
const DB_PATH = path.join(__dirname, "data", "db.json");

app.use(cors());
app.use(express.json());

const readDB = () => {
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
};

const writeDB = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

app.get("/", (req, res) => {
  res.send("TaskFlow Pro Backend Running");
});

app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;
  const db = readDB();

  const exists = db.users.find((user) => user.email === email);
  if (exists) return res.status(400).json({ message: "User already exists" });

  const user = {
    id: Date.now().toString(),
    name,
    email,
    password,
  };

  db.users.push(user);
  writeDB(db);

  res.json({ message: "Registered successfully", user });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const db = readDB();

  const user = db.users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  res.json({ message: "Login successful", user });
});

app.get("/api/projects", (req, res) => {
  const db = readDB();
  res.json(db.projects);
});

app.post("/api/projects", (req, res) => {
  const db = readDB();

  const project = {
    id: Date.now().toString(),
    name: req.body.name,
    progress: req.body.progress || 0,
    tasks: req.body.tasks || 0,
  };

  db.projects.push(project);
  writeDB(db);

  res.json(project);
});

app.delete("/api/projects/:id", (req, res) => {
  const db = readDB();
  db.projects = db.projects.filter((project) => project.id !== req.params.id);
  writeDB(db);

  res.json({ message: "Project deleted" });
});

app.get("/api/tasks", (req, res) => {
  const db = readDB();
  res.json(db.tasks);
});

app.post("/api/tasks", (req, res) => {
  const db = readDB();

  const task = {
    id: Date.now().toString(),
    title: req.body.title,
    status: req.body.status || "Todo",
    priority: req.body.priority || "Medium",
    date: req.body.date || "No date",
  };

  db.tasks.push(task);
  writeDB(db);

  res.json(task);
});

app.put("/api/tasks/:id", (req, res) => {
  const db = readDB();

  db.tasks = db.tasks.map((task) =>
    task.id === req.params.id ? { ...task, ...req.body } : task
  );

  writeDB(db);

  res.json({ message: "Task updated" });
});

app.delete("/api/tasks/:id", (req, res) => {
  const db = readDB();

  db.tasks = db.tasks.filter((task) => task.id !== req.params.id);
  writeDB(db);

  res.json({ message: "Task deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});