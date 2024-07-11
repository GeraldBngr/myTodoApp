import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function TaskItem({ tasks, onEditTask, toggleCompleted, onDeleteTask }) {
  const { theme } = useContext(ThemeContext);
   // Destructure theme from ThemeContext to apply styles based on the current theme
  return (
    <>
        {/* Map over the tasks array to render each task item */}
      {tasks.map((task) => (
        <div className={`task-item task-item--${theme}`} key={task.id}>
          <div className="task-item__toggle-content">
             {/* Checkbox to toggle task completion */}
            {" "}
            <input
              type="checkbox"
              name="done"
              id="done"
              className="task-item__toggle-content--toggle-completed"
              checked={task.completed}
              onChange={() => toggleCompleted(task.id, task)}
            />
            {/* Task description with conditional styling based on completion */}
            <span
              className="task-item__toggle-content--task-description"
              style={
                task.completed
                  ? { textDecoration: "line-through" }
                  : { textDecoration: "none" }
              }
            >
              {task.description}
            </span>{" "}
          </div>
          <div className="task-item--tools-buttons">
             {/* Edit button to open the task in the edit modal */}
            <button
              onClick={() => onEditTask(task)}
              className="task-item--tools-buttons--edit-button"
            ></button>
             {/* Delete button to remove the task */}
            <button
              onClick={() => onDeleteTask(task.id)}
              className="task-item--tools-buttons--delete-button"
            ></button>{" "}
          </div>
        </div>
      ))}
    </>
  );
}

export default TaskItem;
