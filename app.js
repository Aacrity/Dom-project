// Define UI vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listener
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // Add to UI from LS
  document.addEventListener("DOMContentLoaded", getTasks);
  //  Add task event
  form.addEventListener("submit", addTask);

  // Remove task event
  taskList.addEventListener("click", removeTask);

  // Clear through clear tsak buttton
  clearBtn.addEventListener("click", clearTasks);

  // Filter the list items
  filter.addEventListener("keyup", filterTasks);
}
// get task to add in UI permanently
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));

    tasks.forEach(function (task) {
      // Create li element
      const li = document.createElement("li");
      // add class
      li.className = "collection-item";
      // Create text node and append to li
      li.appendChild(document.createTextNode(task));
      // Create new link element
      const link = document.createElement("a");
      // Add class
      link.className = "delete-item secondary-content";
      // Add icon html
      link.innerHTML = '<i class="fa fa-remove"></i>';
      // Append the link to li
      li.appendChild(link);

      // Append li to ul
      taskList.appendChild(li);
    });
  }
}
// add task temporary in UI ,this doesnot store in local storage
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }
  // Create li element
  const li = document.createElement("li");
  // add class
  li.className = "collection-item";
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement("a");
  // Add class
  link.className = "delete-item secondary-content";
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);
  // console.log(li);

  // Store in Local storage
  storeTaskInLocalStorage(taskInput.value);
  // Clear input
  taskInput.value = " ";
  e.preventDefault();
}

// Store task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  // yo task ma chai taskinput ko value cha
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  alert("Task Saved");
}

// Remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}
function removeTaskFromLocalStorage(taskItem) {
  console.log(taskItem);
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Removing through Clear btn all at once
function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  /*
  yo gare ni huncha but above is widely used and fast
  taskList.innerHTML='';
*/
  // taskList.remove();
  // the above will remove just for a while after refresh the items will be back so we need to clear from local storage as below
  clearTaskFromLocalStorage();
}
function clearTaskFromLocalStorage() {
  localStorage.clear();
}

// Filter

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    console.log(item);
    // if (item.toLowerCase().indexOf(text) != -1) {
    if (item.toLowerCase().includes(text)) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
