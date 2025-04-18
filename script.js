
const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const filterButtons = document.querySelectorAll(".filter");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


function displayTasks(filter = "all") {
  taskList.innerHTML = "";
  

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true; 
  });

  filteredTasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.classList.toggle("completed", task.completed);
    taskItem.innerHTML = `
      <span class="task-text">${task.text}</span>
      <div class="actions">
        <button class="complete-btn">✔️</button>
        <button class="remove-btn">🗑️</button>
      </div>
    `;
    taskList.appendChild(taskItem);

    
    taskItem.querySelector(".complete-btn").addEventListener("click", () => {
      task.completed = !task.completed;
      saveTasks();
      displayTasks();
    });

    
    taskItem.querySelector(".remove-btn").addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      displayTasks();
    });
  });
}


function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function addTask(taskText) {
  if (!taskText.trim()) return; 
  tasks.push({ text: taskText, completed: false });
  saveTasks();
  displayTasks();
}


addButton.addEventListener("click", () => {
  addTask(taskInput.value);
  taskInput.value = "";
});

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask(taskInput.value);
    taskInput.value = "";
  }
});


filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    displayTasks(button.getAttribute("data-filter"));
  });
});


displayTasks();
