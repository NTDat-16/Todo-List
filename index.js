import { TaskManager } from './repository.js';  
import { STORAGE_KEY, NOTIFICATION_TIME } from './constants.js';
import { saveToStorage, loadFromStorage, escapeHtml } from './libs.js';

// khai bao
let countdown;
const btnAdd = document.getElementById('add-btn');
const btnClose= document.getElementById('close-notification');
const table= document.getElementById('task-table');
const notification = document.getElementById('notification');   
const notificationMessage = document.getElementById('notification-message');
const contentNotification = document.getElementById('content-notification');
const notificationTimer = document.getElementById('notification-timer');
let input = document.getElementById('todo-input');
let timer = 5;
const currentTasks = loadFromStorage(STORAGE_KEY);
const taskManager = new TaskManager();
taskManager.loadFromJson(currentTasks);
if(taskManager.getTasks().length === 0) { 
    taskManager.addTask('learn english');
    saveToStorage(STORAGE_KEY, taskManager.saveTask());
}

// ham render
function renderTask(){
    let html = '';
    
    taskManager.getTasks().forEach((task,index) => {
    html += `
    <tr>
        <td>${index + 1}</td>
        <td>${escapeHtml(task.getName())}</td>
        <td>${task.getStatus()}</td>
        <td>
            <button data-action="change" data-id="${index}">Change Status</button>
            <button data-action="delete" data-id="${index}">Delete</button>
        </td>
    </tr>
    `;
    })
    table.innerHTML = html;

}
// gam action cho table
table.addEventListener('click',(event)=>{
    const btn = event.target.closest('button[data-action]');
    if(!btn) return;
    const {action , id}= btn.dataset;
     const index = parseInt(btn.dataset.id);
    if (action==='change'){
        taskManager.changeTask(id);
        showNotification('success','Success','Task change status successfully')
    }
    if(action ==='delete'){
        taskManager.removeTask(id);
        showNotification('success','Success','Task deleted successfully')
    }
    saveToStorage(STORAGE_KEY, taskManager.saveTask());  
    renderTask();

})
// ham thong bao
function showNotification(types,title,message){
   timer = 5;
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

   },NOTIFICATION_TIME);
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
   taskManager.addTask(taskName);
    showNotification(
        'success',
        'Success',
        'Task added successfully'
    );
    saveToStorage(STORAGE_KEY, taskManager.saveTask());
    renderTask();
    input.value = '';
}
//ham xoa
function deleteTask(index){

taskManager.removeTask(index);
 saveToStorage(STORAGE_KEY, taskManager.saveTask());
  showNotification(
    'success',
    'Success',
    'Task  deleted  successfully'
    );
    renderTask();
}
//ham sua
function changeTask(index){
    taskManager.changeTaskStatus(index);
  showNotification(
    'success',
    'Success',
    'Task status updated successfully'
);
saveToStorage(STORAGE_KEY, taskManager.saveTask());
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

renderTask();

     


    