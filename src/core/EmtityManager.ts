import { BaseRepository } from './BaseRepository.js';
import { EmployeeRepository } from '../repository/EmployeeRepository.js';
import { Employee } from '../schema/employee.js';
import { TaskRepository } from '../repository/TaskRepository.js';
import { Task } from '../schema/task.js';
import { IEntityManager } from './IEmtityManager.js';
export class EntityManager implements IEntityManager {
  #repositories = new Map<any, BaseRepository<any>>();

  constructor() {
    this.#repositories.set(Employee, new EmployeeRepository('employees'));
    this.#repositories.set(Task, new TaskRepository('tasks'));
  }

  loadAll(): void {
    this.#repositories.forEach((repo) => repo.load());
  }

  getRepository<T extends { getId(): string; serialize(): object }>(
    entityClass: new (...args: any[]) => T,
  ): BaseRepository<T> {
    return this.#repositories.get(entityClass) as BaseRepository<T>;
  }
  #persistQueue = new Set<object>();
  #removeQueue = new Set<object>();

  persist(entity: object): void {
    this.#removeQueue.delete(entity);
    this.#persistQueue.add(entity);
  }

  remove(entity: object): void {
    this.#persistQueue.delete(entity);
    this.#removeQueue.add(entity);
  }

  flush(): void {
    this.#persistQueue.forEach((entity) => {
      const repo = this.#getRepoForEntity(entity);
      repo?.add(entity as any);
    });

    this.#removeQueue.forEach((entity) => {
      const repo = this.#getRepoForEntity(entity);
      if (repo) repo.remove((entity as any).getId());
    });

    this.#repositories.forEach((repo) => repo.save());

    this.#persistQueue.clear();
    this.#removeQueue.clear();
  }

  #getRepoForEntity(entity: object) {
    if (entity instanceof Employee) return this.#repositories.get(Employee);
    if (entity instanceof Task) return this.#repositories.get(Task);
    return undefined;
  }
}
