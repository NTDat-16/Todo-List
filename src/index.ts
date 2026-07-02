import { EntityManager } from './core/EmtityManager.js';
import { Task } from './schema/task.js';
import { escapeHtml, createInputValidator } from './libs/libs.js';
import { NotificationManager } from './NotificationManager.js';
import { TaskRepository } from './repository/TaskRepository.js';

const em = new EntityManager();
em.loadAll();
const taskRepository = em.getRepository(Task) as TaskRepository;

const btnAdd = document.getElementById('add-btn') as HTMLButtonElement;
const table  = document.getElementById('task-table') as HTMLTableSectionElement;
const input  = document.getElementById('todo-input') as HTMLInputElement;

const notif          = new NotificationManager().init();
const inputValidator = createInputValidator(input);

function renderTask(): void {
    const tasks = taskRepository.findAll();

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

table.addEventListener('click', (event: MouseEvent) => {
    const btn = (event.target as HTMLElement).closest('button[data-action]') as HTMLButtonElement | null;
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

    const task = new Task(taskName);
    em.persist(task);
    em.flush();
    notif.success('Task added successfully');
    renderTask();
    input.value = '';
}

btnAdd.addEventListener('click', addTask);
input.addEventListener('input', () => inputValidator.clear());

renderTask();