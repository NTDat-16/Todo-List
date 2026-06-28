import { EmployeeManager } from './repository/employee-manager.js';
import { escapeHtml, getNotificationStylesByStatus,createInputValidator } from './libs/libs.js';
import {
  STORAGE_KEY_EMPLOYEE,
  NOTIFICATION_TIME,
  NOTIFICATION_TIMER,
  EMPLOYEE_POSITION
} from './constants/constants.js';
import { EmployeeStorage } from './storage/employee-storage.js';
import { Employee } from './schema/Employee.js';
import { NotificationManager } from './NotificationManager.js';

const employeeStorage = new EmployeeStorage(STORAGE_KEY_EMPLOYEE);
const employeeManager = new EmployeeManager(employeeStorage.loadEmployees());
const btnAdd = document.getElementById('add-btn');
if (employeeManager.getEmployees().length === 0) {
  employeeManager.addEmployee('Nguyen Van A', 'Developer');
  employeeStorage.saveEmployees(employeeManager.getEmployees());
}
const input = document.getElementById('todo-input');

const inputValidator = createInputValidator(input);
let countdown;
let timer = NOTIFICATION_TIMER;
const table = document.getElementById('employee-table');
const btnClose = document.getElementById('close-notification');
const notif = new NotificationManager().init();

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
      notif.success( 'Employee deleted successfully!');
      renderEmployees();
    }
  }

  if (action === 'change') {
    const emp = employeeManager.getEmployee(id);
    if (!emp) return;
    employeeManager.updatePosition(id);
      employeeStorage.saveEmployees(employeeManager.getEmployees());
     notif.success( 'Employee updated successfully!');
      renderEmployees();
    }
  
});
function addEmployee(nameEmployee) {
 const emplyeeName = escapeHtml(input.value.trim());
 if (!inputValidator.validate('Employee name cannot be empty')) return;
  clearInputError();
  employeeManager.addEmployee(nameEmployee, EMPLOYEE_POSITION.EMPLOYEE);
  employeeStorage.saveEmployees(employeeManager.getEmployees());

     notif.success( 'Employee updated successfully!');
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
