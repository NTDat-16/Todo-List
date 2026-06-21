import { EmployeeManager } from './repository.js';
import { escapeHtml, getNotificationStylesByStatus } from './libs.js';
import { STORAGE_KEY_EMPLOYEE,NOTIFICATION_TIME,NOTIFICATION_TIMER } from './constants.js';
import { EmployeeStorage } from './storage.js';
import { Employee } from './schema.js';
import { EMPLOYEE_POSITION } from './constants.js';
const employeeStorage = new EmployeeStorage(STORAGE_KEY_EMPLOYEE);
const employeeManager = new EmployeeManager(employeeStorage.loadEmployees());
const btnAdd= document.getElementById('add-btn');
if (employeeManager.getEmployees().length === 0) {
    employeeManager.addEmployee('Nguyen Van A', 'Developer');
    employeeStorage.saveEmployees(employeeManager.getEmployees());
}
let countdown;
let timer = NOTIFICATION_TIMER;
const table = document.getElementById('employee-table');
const btnClose= document.getElementById('close-notification');
const notification = document.getElementById('notification');   
const notificationMessage = document.getElementById('notification-message');
const contentNotification = document.getElementById('content-notification');
const notificationTimer = document.getElementById('notification-timer');
function renderEmployees() {
    table.innerHTML = employeeManager.getEmployees().map(emp => `
        <tr>
            <td>${escapeHtml(emp.getName())}</td>
            <td>${emp.getPosition()}</td>
            <td>
                <button data-action="view" data-id="${emp.getId()}">View Tasks</button>
            </td>
        </tr>
    `).join('');
}
function addEmployee(nameEmployee){
    if(nameEmployee===''){
        showNotification('error','Error',' ten khong duoc de trong !');
        return;
    }
    employeeManager.addEmployee(nameEmployee,EMPLOYEE_POSITION.EMPLOYEE);
    employeeStorage.saveEmployees(employeeManager.getEmployees());

    showNotification('success','Success','them nhan vien thanh cong !');
    renderEmployees();
}
table.addEventListener('click', (event) => {
    const btn = event.target.closest('button[data-action]');
    if (!btn) return;

    if (btn.dataset.action === 'view') {
    window.location.href = `task.html?employeeId=${btn.dataset.id}`;    
    }
});
function startTimerNotification(){
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
function showNotification(types,title,message){
    notificationMessage.textContent = message;
    notification.style.display = 'block';
    notificationTimer.textContent = `Notification will close in ${timer} seconds`;
    contentNotification.textContent = title;
    notification.style.border = getNotificationStylesByStatus(types);
    startTimerNotification();
    
}
btnAdd.addEventListener('click', () => {
    const input = document.getElementById('todo-input');
    addEmployee(input.value.trim());
    input.value = '';
});
btnClose.addEventListener('click',()=>notification.style.display='none');
renderEmployees();