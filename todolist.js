const taskInput = document.getElementById("taskInput");
const categorySelect = document.getElementById("categorySelect");
const prioritySelect = document.getElementById("prioritySelect");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage or initialize with empty array
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // If no tasks exist, add default tasks
  if (tasks.length === 0) {
    const defaultTasks = [
      { id: Date.now(), name: "Complete the project report", category: "Completed", priority: "High" },
      { id: Date.now() + 1, name: "Start a new design mockup", category: "In Progress", priority: "Medium" }
    ];
    // Save default tasks to localStorage
    localStorage.setItem("tasks", JSON.stringify(defaultTasks));
    tasks = defaultTasks; // Set tasks to default ones
  }

  renderTasks(tasks); // Render the tasks
}

// Event listener for adding a task
addTaskButton.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  const category = categorySelect.value;
  const priority = prioritySelect.value;

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  // Create task object
  const task = {
    id: Date.now(), // Unique ID for the task
    name: taskText,
    category,
    priority,
  };

  // Get tasks from localStorage, or initialize an empty array
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Add task to the tasks array
  tasks.push(task);

  // Save updated tasks array to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Render the updated task list
  renderTasks(tasks);

  // Clear the input field
  taskInput.value = "";
}

// Render tasks in the to-do list
function renderTasks(tasks) {
  taskList.innerHTML = ""; // Clear existing tasks

  tasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.className = "task-item";

    // Task content: Name, Priority, and Category
    const taskContent = document.createElement("span");
    taskContent.textContent = `${task.name} - ${task.priority} (${task.category})`;

    // Edit Button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-button";
    editButton.addEventListener("click", () => editTask(task));

    // Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", () => {
      // Get tasks from localStorage
      const tasks = JSON.parse(localStorage.getItem("tasks"));

      // Remove the task from the tasks array
      const index = tasks.findIndex((t) => t.id === task.id);
      tasks.splice(index, 1);

      // Save the updated tasks back to localStorage
      localStorage.setItem("tasks", JSON.stringify(tasks));

      // Re-render the task list
      renderTasks(tasks);
    });

    // Append elements to the list item
    listItem.appendChild(taskContent);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    // Add the task to the task list
    taskList.appendChild(listItem);
  });
}

// Edit Task Function
function editTask(task) {
  const newTaskName = prompt("Edit your task:", task.name);
  if (newTaskName !== null && newTaskName.trim() !== "") {
    // Get tasks from localStorage
    const tasks = JSON.parse(localStorage.getItem("tasks"));

    // Update the task's name
    task.name = newTaskName.trim();

    // Save the updated tasks back to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Re-render the task list
    renderTasks(tasks);
  }
}

// Call loadTasks when the page is loaded
window.addEventListener('load', loadTasks);
