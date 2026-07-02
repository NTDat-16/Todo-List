// repository/TaskRepository.ts
import { BaseRepository } from '../core/BaseRepository.js';
import { Task } from '../schema/task.js';
import { TaskStatus } from '../constants/constants.js';

export class TaskRepository extends BaseRepository<Task> {
    fromJSON(data: any): Task {
        return new Task(data.name, data.employeeId, data.id, data.status as TaskStatus);
    }

    findByEmployee(employeeId: string): Task[] {
        return this.items.filter(t => t.getEmployeeId() === employeeId);
    }

    toggleStatus(id: string): void {
        const task = this.findById(id);
        if (!task) return;
        task.setStatus(task.getStatus() === 'pending' ? 'done' : 'pending');
    }
}