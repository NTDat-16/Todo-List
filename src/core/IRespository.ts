export interface IRepository<T>{
    findAll():T[];
    findById(id:string):T|undefined;
    add(entity:T): void;
    remove(id:string):void;
    
}