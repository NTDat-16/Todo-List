import { BaseRepository } from './BaseRepository.js';

export interface IEntityManager {
    getRepository<T extends { getId(): string; serialize(): object }>(
        entityClass: new (...args: any[]) => T
    ): BaseRepository<T>;
    persist(entity: object): void;
    remove(entity: object): void;
    flush(): void;
    loadAll(): void;
}