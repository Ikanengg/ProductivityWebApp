const taskInput = document.getElementById("taskInput");
const categorySelect = document.getElementById("categorySelect");
const prioritySelect = document.getElementById("prioritySelect");
const description = document.getElementById("description");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const fileInput = document.getElementById('fileInput');
const imageBox = document.getElementById('imageBox');

fileInput.addEventListener('change', function (event) {
  const file = event.target.files[0];

  if (file) {
    if (!file.type.startsWith('image/')) {
      alert("Please upload an image file.");
      fileInput.value = "";
      imageBox.style.display = 'none';
      return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
      imageBox.src = e.target.result; // Display the uploaded image
      imageBox.style.display = 'block';
    };

    reader.readAsDataURL(file);
  }
});

// Load tasks from localStorage or initialize with default tasks
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  renderTasks(tasks);
}

// Add a new task
addTaskButton.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  const category = categorySelect.value;
  const priority = prioritySelect.value;
  const descriptions = description.value.trim();
  const file = fileInput.files[0]; // Get the uploaded file
  const now = new Date();
  const currentDateTime = `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`;

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  const task = {
    id: Date.now(),
    name: taskText,
    category,
    priority,
    descriptions,
    addImg: null, 
    currentDateTime
  };

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      task.addImg = e.target.result;
      saveTask(task);
    };
    reader.readAsDataURL(file);
  } else {
    saveTask(task); 
  }
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks(tasks);
  taskInput.value = ""; // Clear the input field
  fileInput.value = ""; // Clear the file input
  imageBox.style.display = 'none'; // Hide the image preview
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
      const tasks = JSON.parse(localStorage.getItem("tasks"));
      const index = tasks.findIndex((t) => t.id === task.id);
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
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
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const index = tasks.findIndex((t) => t.id === task.id);
    tasks[index].name = newTaskName.trim();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks(tasks);
  }
}

// Call loadTasks when the page is loaded
window.addEventListener('load', loadTasks);
