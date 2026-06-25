import { TaskManager } from './repository/task-manager.js';
import { STORAGE_KEY, NOTIFICATION_TIME, NOTIFICATION_TIMER } from './constants/constants.js';
import { getNotificationStylesByStatus, escapeHtml } from './libs/libs.js';
import { TaskStorage } from './storage/task-storage.js';
import { NotificationManager } from './NotificationManager.js';
// khai bao
let countdown;
const btnAdd = document.getElementById('add-btn');
const btnClose = document.getElementById('close-notification');
const table = document.getElementById('task-table');
const taskFound = document.getElementById('task-found');
let input = document.getElementById('todo-input');
let timer = NOTIFICATION_TIMER;
const taskStorage = new TaskStorage(STORAGE_KEY);
const taskManager = new TaskManager(taskStorage.loadTasks());
const notif = new NotificationManager({
  notification: document.getElementById('notification'),
  notificationMessage: document.getElementById('notification-message'),
  contentNotification: document.getElementById('content-notification'),
  notificationTimer: document.getElementById('notification-timer'),
});

// ham render
function renderTask() {
  let html = '';
  const tasks = taskManager.getTasks();
  if (tasks.length === 0) {
    table.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center">Task not found</td>
            </tr>`;
    return;
  }
  taskManager.getTasks().forEach((task, index) => {
    html += `
    <tr>
        <td>${index + 1}</td>
        <td>${escapeHtml(task.getName())}</td>
        <td>${task.getStatus()}</td>
        <td>
            <button data-action="change" data-id="${task.getId()}">Change Status</button>
            <button data-action="delete" data-id="${task.getId()}">Delete</button>
        </td>
    </tr>
    `;
  });
  table.innerHTML = html;
}
// gam action cho table
table.addEventListener('click', (event) => {
  const btn = event.target.closest('button[data-action]');
  if (!btn) return;
  const { action, id } = btn.dataset;
  const index = parseInt(btn.dataset.id);
  if (action === 'change') {
    taskManager.changeTask(id);
    notif.show('success', 'Success', 'Task added successfully');
  }
  if (action === 'delete') {
    taskManager.removeTask(id);
    notif.show('success', 'Success', 'Task added successfully');
  }
  taskStorage.saveTasks(taskManager.getTasks());
  renderTask();
});
// ham thong bao

// ham add
function addTask() {
  let taskName = input.value.trim();
  if (taskName === '') {
    showNotification('error', 'Error', 'Task name cannot be empty');
    return;
  }
  taskManager.addTask(taskName);
  showNotification('success', 'Success', 'Task added successfully');

  taskStorage.saveTasks(taskManager.getTasks());
  renderTask();
  input.value = '';
}
//ham xoa
function deleteTask(index) {
  taskManager.removeTask(index);

  taskStorage.saveTasks(taskManager.getTasks());
  showNotification('success', 'Success', 'Task  deleted  successfully');
  renderTask();
}
//ham sua
function changeTask(id) {
  taskManager.changeTaskStatus(id);
  showNotification('success', 'Success', 'Task status updated successfully');
  taskStorage.saveTasks(taskManager.getTasks());
  renderTask();
}

// action add
btnAdd.addEventListener('click', addTask);
//action dong modal thong bao
btnClose.addEventListener('click', notif.close());

renderTask();
