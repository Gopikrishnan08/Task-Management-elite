document.addEventListener("DOMContentLoaded", loadTasks);
const taskList = document.getElementById("taskList");
const darkModeToggle = document.getElementById("darkModeToggle");

// Load tasks from local storage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(addTaskToDOM);
}

// Add new task
function addTask() {
    const title = document.getElementById("taskTitle").value;
    const desc = document.getElementById("taskDesc").value;
    const priority = document.getElementById("taskPriority").value;

    if (!title.trim()) return alert("Task title is required!");

    const task = { id: Date.now(), title, desc, priority, completed: false };
    addTaskToDOM(task);

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDesc").value = "";
}

// Display task in DOM
function addTaskToDOM(task) {
    const taskDiv = document.createElement("div");
    taskDiv.className = `task ${task.completed ? "completed" : ""}`;
    taskDiv.setAttribute("data-id", task.id);
    
    taskDiv.innerHTML = `
        <div>
            <h3>${task.title} (${task.priority})</h3>
            <p>${task.desc}</p>
        </div>
        <div>
            <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleComplete(${task.id})">
            <button onclick="deleteTask(${task.id})">🗑</button>
        </div>
    `;

    taskList.appendChild(taskDiv);
}

// Toggle task completion
function toggleComplete(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    refreshTasks();
}

// Delete task
function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    refreshTasks();
}

// Refresh the task list
function refreshTasks() {
    taskList.innerHTML = "";
    loadTasks();
}

// Dark Mode Toggle
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});

// Load Dark Mode preference
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
}
