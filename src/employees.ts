import { EntityManager } from './core/EmtityManager.js';
import { Employee } from './schema/employee.js';
import { escapeHtml, createInputValidator } from './libs/libs.js';
import { EMPLOYEE_POSITION } from './constants/constants.js';
import { NotificationManager } from './NotificationManager.js';
import { EmployeeRepository } from './repository/EmployeeRepository.js';

const em = new EntityManager();
em.loadAll();
const employeeRepository = em.getRepository(Employee) as EmployeeRepository;

const btnAdd = document.getElementById('add-btn') as HTMLButtonElement;
const table  = document.getElementById('employee-table') as HTMLTableSectionElement;
const input  = document.getElementById('todo-input') as HTMLInputElement;

const notif          = new NotificationManager().init();
const inputValidator = createInputValidator(input);

if (employeeRepository.findAll().length === 0) {
    const defaultEmp = new Employee('Nguyen Van A', EMPLOYEE_POSITION.EMPLOYEE);
    em.persist(defaultEmp);
    em.flush();
}

function renderEmployees(): void {
    table.innerHTML = employeeRepository.findAll().map(emp => `
        <tr>
            <td>${escapeHtml(emp.getName())}</td>
            <td>${emp.getPosition()}</td>
            <td>
                <button data-action="view"   data-id="${emp.getId()}">View Tasks</button>
                <button data-action="change" data-id="${emp.getId()}">Change Position</button>
                <button data-action="delete" data-id="${emp.getId()}">Delete</button>
            </td>
        </tr>
    `).join('');
}

table.addEventListener('click', (event: MouseEvent) => {
    const btn = (event.target as HTMLElement).closest('button[data-action]') as HTMLButtonElement | null;
    if (!btn) return;

    const { action, id } = btn.dataset;
    if (!id) return;

    if (action === 'view') {
        window.location.href = `task.html?employeeId=${id}`;
    }

    if (action === 'delete') {
        if (!confirm('Are you sure?')) return;
        const emp = employeeRepository.findById(id);
        if (!emp) return;
        em.remove(emp);
        em.flush();
        notif.success('Employee deleted successfully!');
        renderEmployees();
    }

    if (action === 'change') {
        employeeRepository.updatePosition(id);
        em.flush();
        notif.success('Employee position updated successfully!');
        renderEmployees();
    }
});

function addEmployee(name: string): void {
    if (!inputValidator.validate('Employee name cannot be empty')) return;
    inputValidator.clear();

    const emp = new Employee(escapeHtml(name), EMPLOYEE_POSITION.EMPLOYEE);
    em.persist(emp);
    em.flush();
    notif.success('Employee added successfully!');
    renderEmployees();
    input.value = '';
}

btnAdd.addEventListener('click', () => addEmployee(input.value.trim()));
input.addEventListener('input', () => inputValidator.clear());

renderEmployees();