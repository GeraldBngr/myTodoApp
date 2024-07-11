import { useState, useEffect, useContext } from "react";
import TaskList from "./components/TaskList";
import SortBar from "./components/SortBar";
import {
  addTask,
  fetchTasks,
  _un_toggle,
  deleteTask,
  updateTaskDesc,
} from "./api-calls/db-crud";
import sortTasks from "./utils/sort";
import DialogModal from "./components/DialogModal";
import { ThemeContext } from "./components/ThemeContext";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]); // Stores all tasks
  const [filteredTasks, setFilteredTasks] = useState([]); // Stores filtered/sorted tasks
  const [modalIsOpen, setModalIsOpen] = useState(false); // Controls the modal open/close state
  const [currentTask, setCurrentTask] = useState(null);  // Stores the task being edited or created
  const [selectChoice, setSelectChoice] = useState("all"); // Stores the selected filter option
  const [inputChoice, setInputChoice] = useState(""); // Stores the search input
  const { theme, toggleTheme } = useContext(ThemeContext); // Theme context for light/dark mode

  //fetch tasks from server when component mounts
  useEffect(() => {
    fetchTasks()
      .then((response) => {
        setTasks(response);
        setFilteredTasks(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  //keeps tracks and update filtered tasks whenever user selects between "all","completed","non-completed" 
  useEffect(() => {
    const updatedTasks = sortTasks(selectChoice, inputChoice, tasks);
    setFilteredTasks(updatedTasks);
  }, [selectChoice, inputChoice, tasks]);

// Open modal for editing or creating a task
  function handleOpenModal(task = null) {
    setCurrentTask(task);
    setModalIsOpen(true);
    console.log(task, "modal opened");
  }
 // Close the modal and reset the current task
  const handleCloseModal = () => {
    setModalIsOpen(false);
    setCurrentTask(null);
    console.log("modal closed");
  };


// Save a new or updated task
  function handleSaveTask(task) {
    //if task exists updates it's description
    if (task.id) {
      const updatedTasks = tasks.map((t) => (t.id === task.id ? task : t));
      setTasks(updatedTasks);
      updateTaskDesc(task.id, task).then((updatedTaskResponse) => {
        console.log("Task updated on server:", updatedTaskResponse);
      });
    } else {
      //creates and saves a new task
      const newId =
        tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
      task.id = newId.toString();
      const newTasks = [...tasks, task];
      setTasks(newTasks);
     
      addTask(task);
    }
    handleCloseModal();
  }
//toggles a task's "completed" status
  async function toggleCompleted(id, updatedTask) {
    try {
      const updatedTaskResponse = await _un_toggle(id, updatedTask);
      const updatedTasks = tasks.map((task) =>
        task.id === updatedTaskResponse.id ? updatedTaskResponse : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  }


// Delete a task
  async function handleDeleteTask(id) {
   //calls the delete function given an id that handles the delete of a function
    try {
      await deleteTask(id);
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }
// Handle selection change for sorting/filtering tasks
  function handleSelection(event) {
    setSelectChoice(event.target.value);
  }
 // Handle search input change
  function handleSearchType(event) {
    event.preventDefault();
    setInputChoice(event.target.value);
  }

  return (
    <div className={`App App--${theme}`}>
      <div className="container">
        <div className={`App__head-title App__head-title--${theme}`}>
          <h1 className="title">TODO LIST</h1>
        </div>
        <div className={`App__sort-search-bar App__sort-search-bar--${theme}`}>
          {/* Sort and Search Bar */}
          <SortBar
            handleSearch={handleSearchType}
            handleSearchSelect={handleSelection}
          />
           {/* Theme Toggle Button */}
          <button
            className={`App__toggle-theme-button App__toggle-theme-button--${theme}`}
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <img src="public/Moon.svg" alt="Moon icon" />
            ) : (
              <img src="public/Sun-icon.svg" alt="Dark moon icon" />
            )}
          </button>
        </div>
 {/* Task List */}
        <TaskList
          toggleCompleted={toggleCompleted}
          tasks={filteredTasks}
          onEditTask={handleOpenModal}
          onDeleteTask={handleDeleteTask}
        />

         {/* Task Dialog Modal */}
        <DialogModal
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          onSave={handleSaveTask}
          task={currentTask}
        />

        {/* Add Task Button */}
        <div className="add-task-wrapper">
          {" "}
          <div
            className={`App__add-task-button App__add-task-button--${theme}`}
            onClick={() => handleOpenModal()}
          >
            <span>
              <img src="Plus-Icon.svg" alt="" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
