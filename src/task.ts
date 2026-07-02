import { EntityManager } from './core/EmtityManager.js';
import { Task } from './schema/task.js';
import { Employee } from './schema/employee.js';
import { escapeHtml, getEmployeeIdFromUrl, redirectTo, createInputValidator } from './libs/libs.js';
import { NotificationManager } from './NotificationManager.js';
import { TaskRepository } from './repository/TaskRepository.js';
import { EmployeeRepository } from './repository/EmployeeRepository.js';

const employeeId = getEmployeeIdFromUrl();
if (!employeeId) {
  redirectTo('index.html');
  throw new Error('Missing employee id');
}
const currentEmployeeId = employeeId as string;

const em = new EntityManager();
em.loadAll();
const taskRepository = em.getRepository(Task) as TaskRepository;
const employeeRepository = em.getRepository(Employee) as EmployeeRepository;

const btnAdd = document.getElementById('add-btn') as HTMLButtonElement;
const table = document.getElementById('task-table') as HTMLTableSectionElement;
const input = document.getElementById('todo-input') as HTMLInputElement;
const title = document.querySelector('h1') as HTMLHeadingElement;

const notif = new NotificationManager().init();
const inputValidator = createInputValidator(input);

const currentEmployee = employeeRepository.findById(employeeId);
if (!currentEmployee) {
  redirectTo('index.html');
  throw new Error('Employee not found');
}

title.textContent = `Task of ${currentEmployee.getName()}`;

function renderTask(): void {
  const tasks = taskRepository.findByEmployee(currentEmployeeId);

  if (tasks.length === 0) {
    table.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center">Task not found</td>
            </tr>`;
    return;
  }

  table.innerHTML = tasks
    .map(
      (task, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${escapeHtml(task.getName())}</td>
            <td>${task.getStatus()}</td>
            <td>
                <button data-action="change" data-id="${task.getId()}">Change Status</button>
                <button data-action="delete" data-id="${task.getId()}">Delete</button>
            </td>
        </tr>
    `,
    )
    .join('');
}

table.addEventListener('click', (event: MouseEvent) => {
  const btn = (event.target as HTMLElement).closest(
    'button[data-action]',
  ) as HTMLButtonElement | null;
  if (!btn) return;

  const { action, id } = btn.dataset;
  if (!id) return;

  if (action === 'change') {
    taskRepository.toggleStatus(id);
    em.flush();
    notif.success('Task status updated successfully');
  }
  if (action === 'delete') {
    const task = taskRepository.findById(id);
    if (!task) return;
    em.remove(task);
    em.flush();
    notif.success('Task deleted successfully');
  }

  renderTask();
});

function addTask(): void {
  if (!inputValidator.validate('Task name cannot be empty')) return;

  const taskName = escapeHtml(input.value.trim());
  inputValidator.clear();

  const task = new Task(taskName, currentEmployeeId);
  em.persist(task);
  em.flush();
  notif.success('Task added successfully');
  renderTask();
  input.value = '';
}

btnAdd.addEventListener('click', addTask);
input.addEventListener('input', () => inputValidator.clear());
document.getElementById('back-btn')?.addEventListener('click', () => redirectTo('index.html'));

renderTask();
