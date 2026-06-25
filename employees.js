import { EmployeeManager } from './repository/employee-manager.js';
import { escapeHtml, getNotificationStylesByStatus } from './libs/libs.js';
import {
  STORAGE_KEY_EMPLOYEE,
  NOTIFICATION_TIME,
  NOTIFICATION_TIMER,
  EMPLOYEE_POSITION
} from './constants/constants.js';
import { EmployeeStorage } from './storage/employee-storage.js';
import { Employee } from './schema/employee.js';
import { NotificationManager } from './NotificationManager.js';

const employeeStorage = new EmployeeStorage(STORAGE_KEY_EMPLOYEE);
const employeeManager = new EmployeeManager(employeeStorage.loadEmployees());
const btnAdd = document.getElementById('add-btn');
if (employeeManager.getEmployees().length === 0) {
  employeeManager.addEmployee('Nguyen Van A', 'Developer');
  employeeStorage.saveEmployees(employeeManager.getEmployees());
}
let countdown;
let timer = NOTIFICATION_TIMER;
const table = document.getElementById('employee-table');
const btnClose = document.getElementById('close-notification');
const notif = new NotificationManager({
  notification: document.getElementById('notification'),
  notificationMessage: document.getElementById('notification-message'),
  contentNotification: document.getElementById('content-notification'),
  notificationTimer: document.getElementById('notification-timer'),
});
function renderEmployees() {
  table.innerHTML = employeeManager
    .getEmployees()
    .map(
      (emp) => `
        <tr>
            <td>${escapeHtml(emp.getName())}</td>
            <td>${emp.getPosition()}</td>
           <td>
                <button data-action="view" data-id="${emp.getId()}">View Tasks</button>
                <button data-action="change" data-id="${emp.getId()}">Change Position</button>
                <button data-action="delete" data-id="${emp.getId()}">Delete</button>
            </td>
           
        </tr>
    `,
    )
    .join('');
}
table.addEventListener('click', (event) => {
  const btn = event.target.closest('button[data-action]');
  if (!btn) return;

  const { action, id } = btn.dataset;

  if (action === 'view') {
    window.location.href = `task.html?employeeId=${id}`;
  }

  if (action === 'delete') {
    if (confirm('Are you sure you want to delete this employee?')) {
      employeeManager.removeEmployee(id);

      employeeStorage.saveEmployees(employeeManager.getEmployees());
      notif.show('success', 'Success', 'Employee deleted successfully!');
      renderEmployees();
    }
  }

  if (action === 'change') {
    const emp = employeeManager.getEmployee(id);
    if (!emp) return;
    employeeManager.updatePosition(id);
      employeeStorage.saveEmployees(employeeManager.getEmployees());
      notif.show('success', 'Success', 'Employee updated successfully!');
      renderEmployees();
    }
  
});
function addEmployee(nameEmployee) {
  if (nameEmployee === '') {
    notif.show('error', 'Error', 'Ten khong duoc de trong!');
    return;
  }
  employeeManager.addEmployee(nameEmployee, EMPLOYEE_POSITION.EMPLOYEE);
  employeeStorage.saveEmployees(employeeManager.getEmployees());

  notif.show('success', 'Success', 'Task added successfully');
  renderEmployees();
}
table.addEventListener('click', (event) => {
  const btn = event.target.closest('button[data-action]');
  if (!btn) return;

  if (btn.dataset.action === 'view') {
    window.location.href = `task.html?employeeId=${btn.dataset.id}`;
  }
});

btnAdd.addEventListener('click', () => {
  const input = document.getElementById('todo-input');
  addEmployee(input.value.trim());
  input.value = '';
});
btnClose.addEventListener('click', () => notif.close());
renderEmployees();
