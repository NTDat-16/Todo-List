import Task from "./schema.js";
// khai bao
let countdown;
const btnAdd = document.getElementById('add-btn');
const btnClose= document.getElementById('close-notification');
const notificationtime = 1000;
const table= document.getElementById('task-table');
const notification = document.getElementById('notification');   
const notificationMessage = document.getElementById('notification-message');
const contentNotification = document.getElementById('content-notification');
const notificationTimer = document.getElementById('notification-timer');
let input = document.getElementById('todo-input');

const data =JSON.parse(localStorage.getItem('tasks')) || [];
const ArrTask = new Task();
data.forEach(task => ArrTask.addTask(task.name));

if(ArrTask.getTasks().length === 0){
    ArrTask.addTask('learn english');
    saveTask();
}
// ham save
function saveTask(){
localStorage.setItem('tasks',JSON.stringify(ArrTask.getTasks()));
}
// ham render
function renderTask(){
    let html = '';
    
    ArrTask.getTasks().forEach((task,index) => {
    html += `
    <tr>
        <td>${index + 1}</td>
        <td>${escapeHtml(task.name)}</td>
        <td>${task.status}</td>
        <td>
            <button class="btnchange" data-index="${index}">Change Status</button>
            <button class="btndelete" data-index="${index}">Delete</button>  
        </td>
    </tr>
    `;
    })
    table.innerHTML = html;
    // gan action cho nut change cua bang
document.querySelectorAll('.btnchange').forEach(btn => {
    btn.addEventListener('click', ()=>{
    const index = parseInt(btn.dataset.index);
    ArrTask.changeTaskStatus(index);
    saveTask();
    showNotification(
        'success',
        'Success',
        'Task status updated successfully'  );
    renderTask();

    });
});
// gan action cho nut xoa cua bang
document.querySelectorAll('.btndelete').forEach(btn =>{
    btn.addEventListener('click', ()=>{
        const index = parseInt(btn.dataset.index);
        ArrTask.removeTask(index);
        saveTask();
        showNotification(
            'success',
            'Success',
            'Task deleted successfully'
        );
        renderTask();
    });
})
}
// ham thong bao
function showNotification(types,title,message){
   let timer = 5;
    notificationMessage.textContent = message;
    notification.style.display = 'block';
    notificationTimer.textContent = `Notification will close in ${timer} seconds`;
    contentNotification.textContent = title;
    switch(types){
        case 'success':
            notification.style.border = '3px solid green';
            break;
        case 'error':
            notification.style.border = '3px solid red';
            break;
        default:
            notification.style.border = '3px solid gray';
    }
    clearInterval(countdown);
    countdown = setInterval(()=>{
    timer--;
    notificationTimer.textContent = `Notification will close in ${timer} seconds`;
    if(timer <= 0){
        clearInterval(countdown);
        notification.style.display = 'none';
    }    

   },notificationtime);
}
// ham add
function addTask(){
    let taskName = input.value.trim();
    if (taskName ==='') {
       showNotification(
        'error',
        'Error',
        'Task name cannot be empty'
    );
        return;

    }
   ArrTask.addTask(taskName);
    showNotification(
        'success',
        'Success',
        'Task added successfully'
    );
    saveTask();
    renderTask();
    input.value = '';
}
//ham xoa
function deleteTask(index){

    ArrTask.removeTask(index);
    saveTask();
  showNotification(
    'success',
    'Success',
    'Task  deleted  successfully'
);
    renderTask();
}
//ham sua
function changeTask(index){
    ArrTask.changeTaskStatus(index);
  showNotification(
    'success',
    'Success',
    'Task status updated successfully'
);
    saveTask();
    renderTask();
}
//ham dong thong nao
function closeNotification(){
    notification.style.display = 'none';
}
    // action add
btnAdd.addEventListener('click', addTask);
//action dong modal thong bao
btnClose.addEventListener('click',closeNotification);

function escapeHtml(text){
const div = document.createElement('div');
div.textContent= text;
return div.innerHTML;

}
renderTask();

     


    