class Task {
    constructor(name, status='pending') {
        this.name = name;
        this.status = status;
    }
    changeStatus(){
        this.status ==='pending'? this.status = 'done' : this.status = 'pending';
    }
}