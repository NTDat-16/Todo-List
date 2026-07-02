import { TaskManager } from './repository/task-manager.js';
import { EmployeeManager } from './repository/employee-manager.js';
import { TaskStorage } from './storage/task-storage.js';
import { EmployeeStorage } from './storage/employee-storage.js';
import { NotificationManager } from './NotificationManager.js';
import { STORAGE_KEY, STORAGE_KEY_EMPLOYEE } from './constants/constants.js';
import { escapeHtml, getEmployeeIdFromUrl, redirectTo, createInputValidator, } from './libs/libs.js';
const employeeId = getEmployeeIdFromUrl();
if (!employeeId) {
    console.log('khong co id nhan vien');
    redirectTo('../index.html');
    throw new Error('Missing employee id');
}
const currentEmployeeId = employeeId;
const btnAdd = document.getElementById('add-btn');
const btnClose = document.getElementById('close-notification');
const table = document.getElementById('task-table');
const input = document.getElementById('todo-input');
const title = document.querySelector('h1');
const taskStorage = new TaskStorage(STORAGE_KEY);
const employeeStorage = new EmployeeStorage(STORAGE_KEY_EMPLOYEE);
const taskManager = new TaskManager(taskStorage.loadTasks());
const employeeManager = new EmployeeManager(employeeStorage.loadEmployees());
const inputValidator = createInputValidator(input);
const notif = new NotificationManager().init();
const currentEmployee = employeeManager.getEmployee(currentEmployeeId);
if (!currentEmployee) {
    redirectTo('../index.html');
    throw new Error('Employee not found');
}
title.textContent = `Task of ${currentEmployee.getName()}`;
function renderTask() {
    const tasks = taskManager.getTasks().filter((t) => t.getEmployeeId() === currentEmployeeId);
    if (tasks.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center">Task not found</td>
            </tr>`;
        return;
    }
    table.innerHTML = tasks
        .map((task, index) => `
    <tr>
        <td>${index + 1}</td>
        <td>${escapeHtml(task.getName())}</td>
        <td> ${task.getStatus()}</td>
         <td>
                <button data-action="change" data-id="${task.getId()}">Change Status</button>
                <button data-action="delete" data-id="${task.getId()}">Delete</button>
            </td>
    </tr>
`)
        .join('');
}
table.addEventListener('click', (event) => {
    const target = event.target;
    const btn = target.closest('button[data-action]');
    if (!btn)
        return;
    const { action, id } = btn.dataset;
    if (!id)
        return;
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
    taskManager.addTask(taskName, currentEmployeeId);
    taskStorage.saveTasks(taskManager.getTasks());
    notif.success('Task added successfully');
    renderTask();
    input.value = '';
}
btnAdd.addEventListener('click', addTask);
btnClose?.addEventListener('click', () => notif.close());
input.addEventListener('input', () => inputValidator.clear());
document.getElementById('back-btn')?.addEventListener('click', () => redirectTo('../index.html'));
renderTask();
//# sourceMappingURL=task.js.map