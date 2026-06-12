const task = JSON.parse(localStorage.getItem('tasks')) || [];
if(task.length === 0){
    task.push({
        name:'learn english',
        status:'pending'
    });
    saveTask();
}
function saveTask(){
localStorage.setItem('tasks',JSON.stringify(task));
}
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

 let countdown;
function showNotification(types,title,message){
    const notification = document.getElementById('notification');   
    const notificationMessage = document.getElementById('notification-message');
    const contentNotification = document.getElementById('content-notification');
    const notificationTimer = document.getElementById('notification-timer');
    let timer = 5;
    notificationMessage.textContent = message;
    notification.style.display = 'block';
    notificationTimer.textContent = `Notification will close in ${timer} seconds`;
   
  
    contentNotification.textContent = title;

    if(types === 'success'){
        notification.style.border = '3px solid green';
    } else if(types === 'error'){
        notification.style.border = '3px solid red';
    }

    clearInterval(countdown);
    countdown = setInterval(()=>{
    timer--;
    notificationTimer.textContent = `Notification will close in ${timer} seconds`;
    if(timer <= 0){
        clearInterval(countdown);
        notification.style.display = 'none';
    }    

   },1000);
}
function addTask(){
    let input = document.getElementById('todo-input');
    let taskName = input.value.trim();
    if (taskName ===    '') {
       showNotification(
        'error',
        'Error',
        'Task name cannot be empty'
    );
        return;

    }
    task.push({
       name:taskName,
       status:'pending'
    });
    showNotification(
        'success',
        'Success',
        'Task added successfully'
    );
    saveTask();
    renderTask();
    input.value = '';
}
function deleteTask(index){

    task.splice(index,1);
    saveTask();
  showNotification(
    'success',
    'Success',
    'Task status deleted  successfully'
);
    renderTask();
}
function changeTask(index){
    if (task[index].status === 'pending') {
        task[index].status = 'done';
    } else {
        task[index].status = 'pending';
    }
  showNotification(
    'success',
    'Success',
    'Task status updated successfully'
);
    saveTask();
    renderTask();
}
renderTask();



const btnAdd = document.getElementById('add-btn');
btnAdd.addEventListener('click', addTask);
const btnClose= document.getElementById('close-notification');
btnClose.addEventListener('click',()=>{
    const notification = document.getElementById('notification');
    notification.style.display = 'none';
})

     


