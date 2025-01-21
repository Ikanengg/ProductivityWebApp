const taskInput = document.getElementById("taskInput");
const categorySelect = document.getElementById("categorySelect");
const prioritySelect = document.getElementById("prioritySelect");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// Shared task state (in-memory)
const tasks = [];

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

  // Add task to the shared state
  tasks.push(task);

  // Render the updated task list
  renderTasks();

  // Clear the input field
  taskInput.value = "";
}

// Render tasks in the to-do list
function renderTasks() {
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
      // Remove task from the shared state
      const index = tasks.findIndex((t) => t.id === task.id);
      tasks.splice(index, 1);
      renderTasks();
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
    task.name = newTaskName.trim();
    renderTasks();
  }
}
