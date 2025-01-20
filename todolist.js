const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

addTaskButton.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  const listItem = document.createElement("li");
  listItem.className = "task-item";

  const taskContent = document.createElement("span");
  taskContent.textContent = taskText;

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.className = "edit-button";
  editButton.addEventListener("click", () => editTask(taskContent));

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete-button";
  deleteButton.addEventListener("click", () => taskList.removeChild(listItem));

  listItem.appendChild(taskContent);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  taskList.appendChild(listItem);

  taskInput.value = "";
}

function editTask(taskContent) {
  const newTask = prompt("Edit your task:", taskContent.textContent);
  if (newTask !== null) {
    taskContent.textContent = newTask.trim() || taskContent.textContent;
  }
}
