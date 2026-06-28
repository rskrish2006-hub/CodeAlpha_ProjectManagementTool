import { useEffect, useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import toast from "react-hot-toast";
import TaskModal from "./TaskModal";

const columns = ["Todo", "In Progress", "Review", "Done"];

const defaultTasks = [
  { id: "1", title: "Create project layout", status: "Todo", priority: "High", date: "Today" },
  { id: "2", title: "Build sidebar UI", status: "Todo", priority: "Medium", date: "Tomorrow" },
  { id: "3", title: "Design task board", status: "In Progress", priority: "High", date: "Today" },
  { id: "4", title: "Check responsive layout", status: "Review", priority: "Medium", date: "Monday" },
  { id: "5", title: "Setup React app", status: "Done", priority: "Low", date: "Done" },
];

const emptyTask = {
  id: null,
  title: "",
  status: "Todo",
  priority: "Medium",
  date: "",
};

const KanbanBoard = ({ searchTerm = "" }) => {
  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskData, setTaskData] = useState(emptyTask);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    setTasks(savedTasks || defaultTasks);
  }, []);

  const saveTasks = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const openAddModal = () => {
    setIsEditing(false);
    setTaskData(emptyTask);
    setShowTaskModal(true);
  };

  const openEditModal = (task) => {
    setIsEditing(true);
    setTaskData(task);
    setShowTaskModal(true);
  };

  const handleSaveTask = () => {
    if (!taskData.title.trim()) {
      toast.error("Enter task title");
      return;
    }

    if (isEditing) {
      saveTasks(tasks.map((task) => (task.id === taskData.id ? taskData : task)));
      toast.success("Task updated successfully!");
    } else {
      const newTask = {
        ...taskData,
        id: String(Date.now()),
        date: taskData.date || "No date",
      };

      saveTasks([...tasks, newTask]);
      toast.success("Task added successfully!");
    }

    setTaskData(emptyTask);
    setShowTaskModal(false);
    setIsEditing(false);
  };

  const deleteTask = (id) => {
    saveTasks(tasks.filter((task) => task.id !== id));
    toast.success("Task deleted!");
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;

    saveTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    toast.success(`Moved to ${newStatus}`);
  };

  return (
    <section className="kanban-section">
      <div className="section-header">
        <h2>Task Board</h2>
        <button onClick={openAddModal}>+ Add Task</button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-grid">
          {columns.map((column) => {
            const filteredTasks = tasks
              .filter((task) => task.status === column)
              .filter((task) =>
                task.title.toLowerCase().includes(searchTerm.toLowerCase())
              );

            return (
              <Droppable droppableId={column} key={column}>
                {(provided) => (
                  <div
                    className="kanban-column"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <h3>{column}</h3>

                    {filteredTasks.map((task, index) => (
                      <Draggable draggableId={task.id} index={index} key={task.id}>
                        {(provided) => (
                          <div
                            className="kanban-card"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="card-top">
                              <span className={`priority ${task.priority.toLowerCase()}`}>
                                {task.priority}
                              </span>

                              <div className="task-actions">
                                <button
                                  className="edit-task"
                                  onClick={() => openEditModal(task)}
                                >
                                  <Pencil size={15} />
                                </button>

                                <button
                                  className="delete-task"
                                  onClick={() => deleteTask(task.id)}
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>

                            <h4>{task.title}</h4>
                            <p>Due: {task.date}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>

      {showTaskModal && (
        <TaskModal
          taskData={taskData}
          setTaskData={setTaskData}
          onClose={() => {
            setShowTaskModal(false);
            setIsEditing(false);
          }}
          onSave={handleSaveTask}
          isEditing={isEditing}
        />
      )}
    </section>
  );
};

export default KanbanBoard;