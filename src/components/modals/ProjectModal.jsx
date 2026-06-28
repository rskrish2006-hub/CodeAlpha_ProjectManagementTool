const ProjectModal = ({ projectName, setProjectName, onClose, onSave }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create New Project</h2>

        <input
          type="text"
          placeholder="Enter project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={onSave}>Save Project</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;