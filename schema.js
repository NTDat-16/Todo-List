export default class Task {
   TaskStatus = {
        PENDING: 'pending',
        DONE: 'done'
    }
    constructor() {
            this.Task=[];
    }
    addTask(taskName){
        this.Task.push({
            name: taskName,
            status: this.TaskStatus.PENDING
        });
    
    }
    changeTaskStatus(index){
        this.Task[index].status === this.TaskStatus.PENDING ? this.Task[index].status = this.TaskStatus.DONE : this.Task[index].status = this.TaskStatus.PENDING;
    }
    removeTask(index){
        this.Task.splice(index,1);

    }
    getTasks(){
        return this.Task;
    }
   getName(index){
     return this.Task[index].name; 
    }

    getStatus(index){ 
        return this.Task[index].status; 
    }
}