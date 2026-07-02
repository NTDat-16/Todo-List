import { IRepository } from './IRespository.js';
export abstract class BaseRepository<
  T extends { getId(): string; serialize(): object },
> implements IRepository<T> {
  protected items: T[] = [];
  protected storageKey: string;
  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }
abstract fromJSON(data: any): T;  
  findAll(): T[] {
    return this.items;
  }
  findById(id: string): T | undefined {
    return this.items.find((item) => item.getId() === id);
  }
  find(id: string): T | undefined {
    return this.findById(id);
}
  add(entity: T): void {
    const exists = this.items.find((item) => item.getId() === entity.getId());
    if (!exists) {
      this.items.push(entity);
    }
  }
  remove(id: string): void {
    this.items = this.items.filter((item) => item.getId() !== id);
  }
 load(): void {
    const raw = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    this.items = raw.map((item: any) => this.fromJSON(item));
}
  save(): void {
   localStorage.setItem(this.storageKey,
    JSON.stringify(this.items.map((item) => item.serialize()))
   )
  }
}
