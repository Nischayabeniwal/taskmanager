let tasks = [];

function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();
  if (!task) return;

  const date = new Date().toISOString().split("T")[0]; // today's date
  tasks.push({ text: task, date });

  input.value = "";
  renderTasks();
  renderCalendar();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
  renderCalendar();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${task.text}</span>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

function renderCalendar() {
  const container = document.getElementById("calendarTasks");
  container.innerHTML = "";

  const grouped = {};
  tasks.forEach(task => {
    if (!grouped[task.date]) grouped[task.date] = [];
    grouped[task.date].push(task.text);
  });

  for (const date in grouped) {
    const div = document.createElement("div");
    div.className = "calendar-day";
    div.innerHTML = `<h3>${date}</h3><ul>${grouped[date]
      .map(t => `<li>${t}</li>`)
      .join("")}</ul>`;
    container.appendChild(div);
  }
}

function showSection(id) {
  document.querySelectorAll("main section").forEach(section => {
    section.classList.remove("active");
  });
  document.getElementById(`${id}-section`).classList.add("active");
}
