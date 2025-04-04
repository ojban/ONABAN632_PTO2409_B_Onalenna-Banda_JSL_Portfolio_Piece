// utils/taskFunction.js

// Simulate fetching tasks from localStorage
export const getTasks = () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

// Simulate saving tasks to localStorage
const saveTasks = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Create a new task and save to localStorage
export const createNewTask = (task) => {
  const tasks = getTasks(); // Retrieve existing tasks
  const newTask = { ...task, id: new Date().getTime() }; // Create new task with unique ID
  tasks.push(newTask); // Add new task to the array
  saveTasks(tasks); // Save updated tasks array to localStorage
  return newTask; // Return the newly created task
};

// Update specific properties of a task
export const patchTask = (id, updates) => {
  const tasks = getTasks();
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex > -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...updates }; // Merge updates into the task
    saveTasks(tasks);
  }
  return tasks; // Optionally return the updated tasks list
};

// Replace a task with a fully updated version
export const putTask = (id, updatedTask) => {
  const tasks = getTasks();
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex > -1) {
    tasks[taskIndex] = updatedTask; // Replace the task entirely
    saveTasks(tasks);
  }
  location.reload(); // Or better, re-render tasks without reloading
};

// Delete a task by ID
export const deleteTask = (id) => {
  const tasks = getTasks();
  const updatedTasks = tasks.filter((task) => task.id !== id); // Remove task with the given ID
  saveTasks(updatedTasks);
  return updatedTasks; // Optionally return the updated tasks list
};
