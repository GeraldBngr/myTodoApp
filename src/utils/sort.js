const sortTasks = (selectChoice, inputChoice, tasks) => {
  
  if (!inputChoice) {
    switch (selectChoice) {
      case "all":
        return tasks;
      case "completed":
        return tasks.filter((task) => task.completed);
      case "non-completed":
        return tasks.filter((task) => !task.completed);
      default:
        console.log("hey");
    }
  } else if (inputChoice) {
    

    switch (selectChoice) {
      case "all":
        return tasks.filter((task) =>
          task.description.toLowerCase().includes(inputChoice.toLowerCase())
        );
      case "completed":
        return tasks
          .filter((task) => task.completed)
          .filter((task_ele) =>
            task_ele.description
              .toLowerCase()
              .includes(inputChoice.toLowerCase())
          );
      case "non-completed":
        return tasks
          .filter((task) => !task.completed)
          .filter((task_ele) =>
            task_ele.description
              .toLowerCase()
              .includes(inputChoice.toLowerCase())
          );
      default:
        console.log("Invalid choice");
    }
  }
};

export default sortTasks;
