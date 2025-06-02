let tasks = [];

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const categorySelect = document.getElementById('categorySelect');
  const prioritySelect = document.getElementById('prioritySelect');
  const dateInput = document.getElementById('deadlineDate');
  const timeInput = document.getElementById('deadlineTime');
  const taskText = taskInput.value.trim();
  const category = categorySelect.value;
  const priority = prioritySelect.value;
  const deadlineDate = dateInput.value;
  const deadlineTime = timeInput.value;

  if (taskText === '') return;

  const taskList = document.getElementById('taskList');
  const li = document.createElement('li');
  let deadlineStr = '';
  if (deadlineDate || deadlineTime) {
    deadlineStr = `<span class="deadline"> (Due: ${deadlineDate} ${deadlineTime})</span>`;
  }
  let categoryStr = `<span class="category">${category}</span>`;
  let priorityStr = `<span class="priority ${priority.toLowerCase()}">${priority}</span>`;
  li.innerHTML = `
    <input type="checkbox" class="complete-checkbox" onclick="toggleComplete(this)">
    <span class="task-text">${taskText}</span>
    ${categoryStr}
    ${priorityStr}
    ${deadlineStr}
    <button class="edit-btn" onclick="editTask(this)">Edit</button>
    <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
  `;
  taskList.appendChild(li);

  taskInput.value = '';
  categorySelect.selectedIndex = 0;
  prioritySelect.selectedIndex = 0;
  dateInput.value = '';
  timeInput.value = '';
}

function toggleComplete(checkbox) {
  const li = checkbox.parentElement;
  li.classList.toggle('completed', checkbox.checked);
  if (checkbox.checked) completeTaskGamification();
}

function editTask(editBtn) {
  const li = editBtn.parentElement;
  const span = li.querySelector('.task-text');
  const currentText = span.textContent;
  const input = document.createElement('input');
  input.type = 'text';
  input.value = currentText;
  input.className = 'edit-input';

  // Replace span with input
  li.replaceChild(input, span);
  editBtn.textContent = 'Save';
  editBtn.onclick = function () { saveTask(this); };
}

function saveTask(saveBtn) {
  const li = saveBtn.parentElement;
  const input = li.querySelector('.edit-input');
  const newText = input.value.trim();
  if (newText === '') return;
  const span = document.createElement('span');
  span.className = 'task-text';
  span.textContent = newText;

  li.replaceChild(span, input);
  saveBtn.textContent = 'Edit';
  saveBtn.onclick = function () { editTask(this); };
}

function deleteTask(deleteBtn) {
  const li = deleteBtn.parentElement;
  li.remove();
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

let dragSrcEl = null;

document.addEventListener('DOMContentLoaded', () => {
  const taskList = document.getElementById('taskList');
  taskList.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'LI') {
      dragSrcEl = e.target;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', e.target.outerHTML);
      e.target.classList.add('dragElem');
    }
  });

  taskList.addEventListener('dragover', function(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
  });

  taskList.addEventListener('drop', function(e) {
    e.stopPropagation();
    if (dragSrcEl !== e.target && e.target.tagName === 'LI') {
      dragSrcEl.parentNode.removeChild(dragSrcEl);
      let dropHTML = e.dataTransfer.getData('text/html');
      e.target.insertAdjacentHTML('beforebegin', dropHTML);
      let dropElem = e.target.previousSibling;
      addDnDHandlers(dropElem);
    }
    return false;
  });

  function addDnDHandlers(elem) {
    elem.addEventListener('dragstart', function(e) {
      dragSrcEl = elem;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', elem.outerHTML);
      elem.classList.add('dragElem');
    });
  }
});

// Theme Switcher
document.getElementById('themeSwitcher').addEventListener('change', function() {
  document.body.className = this.value;
});

// Username personalization
document.getElementById('usernameInput').addEventListener('change', function() {
  localStorage.setItem('username', this.value);
});

// Default category selector
document.getElementById('defaultCategory').addEventListener('change', function() {
  localStorage.setItem('defaultCategory', this.value);
});

// Enable/disable notifications
document.getElementById('enableNotifications').addEventListener('change', function() {
  localStorage.setItem('notifications', this.checked);
});

// Time format
document.getElementById('timeFormat').addEventListener('change', function() {
  localStorage.setItem('timeFormat', this.value);
});

// Reset all tasks
document.getElementById('resetTasksBtn').addEventListener('click', function() {
  if (confirm('Are you sure you want to delete all tasks?')) {
    document.getElementById('taskList').innerHTML = '';
    // Optionally clear localStorage or other data
  }
});

// Gamification (simple example)
let streak = 0, rewards = 0, achievements = [];
function updateGamification() {
  document.getElementById('streak').textContent = `Streak: ${streak} days`;
  document.getElementById('rewards').textContent = `Rewards: ${rewards}`;
  document.getElementById('achievements').textContent = `Achievements: ${achievements.length ? achievements.join(', ') : 'None yet'}`;
}
function completeTaskGamification() {
  streak++;
  rewards += 10;
  if (streak === 7) achievements.push('1 Week Streak!');
  updateGamification();
}
window.completeTaskGamification = completeTaskGamification;