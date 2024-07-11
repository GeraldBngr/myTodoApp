import TaskItem from "./TaskItem";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function TaskList({ tasks, onEditTask, toggleCompleted, onDeleteTask }) {
  // Destructure theme from ThemeContext to apply styles based on the current theme
  const { theme } = useContext(ThemeContext);
  if (tasks.length > 0) {
    return (
      <div className={`tasklist__container tasklist__container--${theme}`}>
        {/* Render TaskItem component with tasks and handlers */}
        <TaskItem onDeleteTask={onDeleteTask} toggleCompleted={toggleCompleted} onEditTask={onEditTask} tasks={tasks} />
      </div>
    );
  } else {
    return (
      <div className={`TaskList__no-items-found TaskList__no-items-found--${theme}`}>
 {/* Display an image and message when there are no tasks */}
        
          {theme === "light" ? <img src="public/Detective-check-footprint 1.svg" alt="Moon icon" /> : <img src="public/Detective-check-footprint 1  dark.svg" alt="Dark moon icon" />}

        <p>Empty...</p>
      </div>
    );
  }
}

export default TaskList;