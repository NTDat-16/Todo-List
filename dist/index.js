import { TaskManager } from './repository/task-manager.js';
import { STORAGE_KEY } from './constants/constants.js';
import { escapeHtml, createInputValidator } from './libs/libs.js';
import { TaskStorage } from './storage/task-storage.js';
import { NotificationManager } from './NotificationManager.js';
const btnAdd = document.getElementById('add-btn');
const table = document.getElementById('task-table');
const input = document.getElementById('todo-input');
const taskStorage = new TaskStorage(STORAGE_KEY);
const taskManager = new TaskManager(taskStorage.loadTasks());
const notif = new NotificationManager().init();
const inputValidator = createInputValidator(input);
function renderTask() {
    const tasks = taskManager.getTasks();
    if (tasks.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center">Task not found</td>
            </tr>`;
        return;
    }
    table.innerHTML = tasks.map((task, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${escapeHtml(task.getName())}</td>
            <td>${task.getStatus()}</td>
            <td>
                <button data-action="change" data-id="${task.getId()}">Change Status</button>
                <button data-action="delete" data-id="${task.getId()}">Delete</button>
            </td>
        </tr>
    `).join('');
}
table.addEventListener('click', (event) => {
    const btn = event.target.closest('button[data-action]');
    if (!btn)
        return;
    const { action, id } = btn.dataset;
    if (action === 'change') {
        taskManager.changeTask(id);
        notif.success('Task status updated successfully');
    }
    if (action === 'delete') {
        taskManager.removeTask(id);
        notif.success('Task deleted successfully');
    }
    taskStorage.saveTasks(taskManager.getTasks());
    renderTask();
});
function addTask() {
    if (!inputValidator.validate('Task name cannot be empty'))
        return;
    const taskName = escapeHtml(input.value.trim());
    inputValidator.clear();
    taskManager.addTask(taskName, crypto.randomUUID());
    taskStorage.saveTasks(taskManager.getTasks());
    notif.success('Task added successfully');
    renderTask();
    input.value = '';
}
btnAdd.addEventListener('click', addTask);
input.addEventListener('input', () => inputValidator.clear());
renderTask();
//# sourceMappingURL=index.js.map