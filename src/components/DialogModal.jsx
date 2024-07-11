import React, { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import { ThemeContext } from "./ThemeContext";
import "../Modal-styles.css";

Modal.setAppElement("#root");

function DialogModal({ isOpen, onRequestClose, onSave, task }) {
  // Destructure theme from ThemeContext to apply styles based on the current theme
  const { theme } = useContext(ThemeContext);
   // State to manage the description input field
  const [description, setDescription] = useState("");


 // Effect to set the description when the task changes
  useEffect(() => {
    if (task) {
      setDescription(task.description); // Set description to the task's description if editing
    } else {
      setDescription(""); // Clear description if creating a new task
    }
  }, [task]);

   // Handle save button click
  const handleSave = () => {
    if (!description) {
      alert("Input invalid");
      return;
    }
    // Create a new task object
    const newTask = task
      ? { ...task, description }
      : { id: null, description, completed: false };
    onSave(newTask);
    setDescription("");
  };

  return (
    <Modal
    className={`${theme}`}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Task Modal"
      
    >
      <div className="modal-content">
        <div className="modal-messages">
          <h2 className={"modal-title"}>
            {task ? "Edit a task in your list!" : "NEW NOTE"}
          </h2>
          <input
            className={`DialogModal__input DialogModal__input--${theme}`}
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Input your note..."
          />{" "}
        </div>
        <div className="modal-buttons">
          <button className="modal-buttons--save-button" onClick={handleSave}>
            <span> {task ? "Update" : "Create"}</span>
          </button>
          <button
            className="modal-buttons--cancel-button"
            onClick={onRequestClose}
          >
            <span>Cancel</span>
          
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DialogModal;
