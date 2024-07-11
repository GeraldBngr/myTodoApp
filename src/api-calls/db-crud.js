import axios from "axios";

const Api_URL = "http://localhost:3000/Tasks";


// Fetch all tasks from the API
async function fetchTasks() {
  try {
    const response = await axios.get(Api_URL);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Add a new task to the json-server
function addTask(obje) {
 
  axios.post(Api_URL, obje).then((response) => console.log(response.data));
}

// Toggle the completed status
async function _un_toggle(id, updatedTask) {
  console.log(typeof(id));
  
  try {
    updatedTask.completed = !updatedTask.completed;

    // PATCH request to update the task
    const response = await axios.patch(`${Api_URL}/${id}`, updatedTask);
    console.log(`Task ${id} toggled:`, response.data);

    return response.data; // Return updated task
  } catch (error) {
    console.error('Error toggling task:', error);
    throw error;
  }
}   

// Delete a task
async function deleteTask(id) {
  console.log(id);
  console.log(typeof(id));
  try {
    await axios.delete(`${Api_URL}/${id}`);
    console.log(`Task ${id} deleted`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
}
//Update a task's description
async function updateTaskDesc(id, updatedTask) {
  try {
    const response = await axios.put(`${Api_URL}/${id}`, updatedTask);
    console.log(`Task ${id} updated:`, response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
}

export { fetchTasks, addTask, _un_toggle, deleteTask ,updateTaskDesc};
