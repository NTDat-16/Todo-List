import {TASK_STATUS} from './constants.js'
export  class Task {
    #id;
    #name;
    #status;
  
    constructor(name) {
            this.#id = crypto.randomUUID();
           this.#name=name;
           this.#status= TASK_STATUS.PENDING;
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
    setStatus(status){
        this.#status = status;
    }
    saveTask(){
        return { 
            name: this.#name,
            status: this.#status 
        } 
    }
}