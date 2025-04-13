if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('serviceWorker.js');
}

const token = localStorage.getItem('accessToken');
if (!token) {
  window.location.href = '/login.html';
}

const apiUrl = 'http://localhost:3000/api/tasks';
const taskList = document.getElementById('task-list');
const taskForm = document.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title');
const searchInput = document.getElementById('search');

let tasksData = [];

async function fetchTasks() {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 401) {
      window.location.href = '/login.html';
    }

    const data = await response.json();
    localStorage.setItem('tasksBackup', JSON.stringify(data));
    renderTasks(data);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    const backupData = JSON.parse(localStorage.getItem('tasksBackup') || '[]');
    renderTasks(backupData);
  }
}

function renderTasks(tasks) {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.title;
    li.onclick = () => editTask(task);
    taskList.appendChild(li);
  });
  tasksData = tasks;
}

taskForm.addEventListener('submit', async e => {
  e.preventDefault();
  const task = { title: taskTitleInput.value };
  try {
    await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(task)
    });
    taskTitleInput.value = '';
    showNotification('Task added successfully!');
    fetchTasks();
  } catch (err) {
    console.error('Error adding task:', err);
  }
});

function editTask(task) {
  taskTitleInput.value = task.title;
  taskForm.onsubmit = async e => {
    e.preventDefault();
    await fetch(`${apiUrl}/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title: taskTitleInput.value })
    });
    showNotification('Task updated successfully!');
    fetchTasks();
    taskForm.onsubmit = taskFormSubmitHandler;
  };
}

const taskFormSubmitHandler = taskForm.onsubmit;

searchInput.addEventListener('input', e => {
  const query = e.target.value.toLowerCase();
  const filteredTasks = tasksData.filter(task => task.title.toLowerCase().includes(query));
  renderTasks(filteredTasks);
});

function showNotification(message) {
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then(registration => {
      registration.showNotification(message);
    });
  }
}

window.addEventListener('keydown', e => {
  if (e.ctrlKey && e.key === 'n') taskTitleInput.focus();
  if (e.ctrlKey && e.key === 's') taskForm.requestSubmit();
});

fetchTasks();