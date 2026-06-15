import {TASK_STATUS} from './constants.js'
export  class Task {
    #name;
    #status;
  
    constructor(name) {
           this.#name=name;
           this.#status= TASK_STATUS.PENDING;
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
    changeStatus(){
        this.#status = this.#status === TASK_STATUS.PENDING
        ? TASK_STATUS.DONE
        : TASK_STATUS.PENDING;    
    }
    saveTask(){
        return { 
            name: this.#name,
            status: this.#status 
        } 
    }
}