import { EmployeeManager } from './repository/employee-manager.js';
import { escapeHtml, createInputValidator } from './libs/libs.js';
import { STORAGE_KEY_EMPLOYEE, EMPLOYEE_POSITION } from './constants/constants.js';
import { EmployeeStorage } from './storage/employee-storage.js';
import { NotificationManager } from './NotificationManager.js';
const employeeStorage = new EmployeeStorage(STORAGE_KEY_EMPLOYEE);
const employeeManager = new EmployeeManager(employeeStorage.loadEmployees());
const btnAdd = document.getElementById('add-btn');
const table = document.getElementById('employee-table');
const input = document.getElementById('todo-input');
const inputValidator = createInputValidator(input);
const notif = new NotificationManager().init();
if (employeeManager.getEmployees().length === 0) {
    employeeManager.addEmployee('Nguyen Van A', EMPLOYEE_POSITION.EMPLOYEE);
    employeeStorage.saveEmployees(employeeManager.getEmployees());
}
function renderEmployees() {
    table.innerHTML = employeeManager
        .getEmployees()
        .map((emp) => `
        <tr>
            <td>${escapeHtml(emp.getName())}</td>
            <td>${emp.getPosition()}</td>
            <td>
                <button data-action="view"   data-id="${emp.getId()}">View Tasks</button>
                <button data-action="change" data-id="${emp.getId()}">Change Position</button>
                <button data-action="delete" data-id="${emp.getId()}">Delete</button>
            </td>
        </tr>
    `)
        .join('');
}
table.addEventListener('click', (event) => {
    const btn = event.target.closest('button[data-action]');
    if (!btn)
        return;
    const { action, id } = btn.dataset;
    if (action === 'view') {
        window.location.href = `src/task.html?employeeId=${id}`;
    }
    if (action === 'delete') {
        if (!confirm('Are you sure you want to delete this employee?'))
            return;
        employeeManager.removeEmployee(id);
        employeeStorage.saveEmployees(employeeManager.getEmployees());
        notif.success('Employee deleted successfully!');
        renderEmployees();
    }
    if (action === 'change') {
        const emp = employeeManager.getEmployee(id);
        if (!emp)
            return;
        employeeManager.updatePosition(id);
        employeeStorage.saveEmployees(employeeManager.getEmployees());
        notif.success('Employee position updated successfully!');
        renderEmployees();
    }
});
function addEmployee(nameEmployee) {
    if (!inputValidator.validate('Employee name cannot be empty'))
        return;
    inputValidator.clear();
    const employeeName = escapeHtml(nameEmployee);
    employeeManager.addEmployee(employeeName, EMPLOYEE_POSITION.EMPLOYEE);
    employeeStorage.saveEmployees(employeeManager.getEmployees());
    notif.success('Employee added successfully!');
    renderEmployees();
    input.value = '';
}
btnAdd.addEventListener('click', () => addEmployee(input.value.trim()));
input.addEventListener('input', () => inputValidator.clear());
renderEmployees();
//# sourceMappingURL=employees.js.map