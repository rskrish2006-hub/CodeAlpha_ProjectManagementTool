const TaskModal = ({ taskData, setTaskData, onClose, onSave, isEditing }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{isEditing ? "Edit Task" : "Create New Task"}</h2>

        <input
          type="text"
          placeholder="Task title"
          value={taskData.title}
          onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
        />

        <select
          value={taskData.status}
          onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
        >
          <option>Todo</option>
          <option>In Progress</option>
          <option>Review</option>
          <option>Done</option>
        </select>

        <select
          value={taskData.priority}
          onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <input
          type="date"
          value={taskData.date}
          onChange={(e) => setTaskData({ ...taskData, date: e.target.value })}
        />

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={onSave}>
            {isEditing ? "Update Task" : "Save Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;