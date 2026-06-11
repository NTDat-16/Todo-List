let task = [];
task.push({
    name:'learn english',
    status:'pending'

});
let addbtn = document.getElementById('add-btn');
function renderTask(){
    const table= document.getElementById('taskTable');
     table.innerHTML = "";
    task.forEach((task,index)=>{
    table.innerHTML +=`
        <tr>
            <td>${index + 1}</td>
            <td>${task.name}</td>
            <td>${task.status}</td>
            <td>
                <button onclick="changeTask(${index})">Change</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </td>
        </tr>`;

    })
}
function addTask(){
    let input = document.getElementById('todo-input');
    let taskName = input.value.trim();
    if (taskName ===    '') {
        alert('Please enter a task name    ');
        return;

    }
    task.push({
       name:taskName,
       status:'pending'
    });
    renderTask();
    input.value = '';
}
function deleteTask(index){
    task.splice(index,1);
    renderTask();
}
function changeTask(index){
    if (task[index].status === 'pending') {
        task[index].status = 'done';
    } else {
        task[index].status = 'pending';
    }
    renderTask();
}
renderTask();
