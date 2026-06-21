import {TASK_STATUS} from './constants.js'
import { EMPLOYEE_POSITION } from './constants.js';
export  class Task {
    #id;
    #name;
    #status;
    #employeeId;
    constructor(name,employeeId) {
            this.#id = crypto.randomUUID();
           this.#name=name;
           this.#status= TASK_STATUS.PENDING;
           this.#employeeId=employeeId;
    }
    getId(){
        return this.#id;

    }
    getName(){ 
        return this.#name; 
    }
    getStatus(){
        return this.#status; 
        }
    setName(name){
        this.#name=name;

    }
    setId(id) { 
        this.#id = id;
     }
    setStatus(status){
        this.#status = status;
    }
    getEmployeeId(){
        return this.#employeeId;
    }
    setEmployeeId(employeeId){
        this.#employeeId=employeeId;
    }
   toJSON() {
    return { 
        id: this.#id,
        name: this.#name,
        status: this.#status,
      employeeId: this.#employeeId };
}

}
export class Employee {
    #id;
    #name;
    #position;

    constructor(name, position = EMPLOYEE_POSITION.EMPLOYEE) {
        this.#id       = crypto.randomUUID();
        this.#name     = name;
        this.#position = position;
    }
   

    getId()       {
         return this.#id; 
        }
    getName()     { 
        return this.#name; 
    }
    getPosition() {
        return this.#position;
     }
    setId(id) { 
        this.#id = id;
     }
    setName(name)         {
         this.#name = name;
         }
    setPosition(position) {
         this.#position = position; 
        }

    toJSON() {
        return {
            id:       this.#id,
            name:     this.#name,
            position: this.#position
        };
    }
}
