import {Task} from "./schema.js"
import { TASK_STATUS } from './constants.js';

export  class TaskManager{
    #Task=[];
      addTask(taskName){
        const task = new Task(taskName);
        this.#Task.push(task);
    
    }
    changeTask(index){
        const currentTask = this.#Task[index];
        if (currentTask) currentTask.changeStatus();
       }
    removeTask(index){
          this.#Task.splice(index, 1);

    }
    getTasks(){
        return this.#Task;
    }
    getTask(index){
        return this.#Task[index];

    }
    loadFromJson(data){
        data.forEach(item =>{
           const task = new Task(item.name);
            if(item.status=== TASK_STATUS.DONE) task.changeStatus();
            this.#Task.push(task);

        })

    }
    saveTask(){
        return this.#Task.map(task=>task.saveTask());
    }
}