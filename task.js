import { TaskManager } from "./repository/TaskManager.js";
import {EmployeeManager} from "./repository/EmployeeManager.js"
import { Employee } from "./schema/Employee.js";
import { TaskStorage, EmployeeStorage } from "./storage/storage.js";
import {
  STORAGE_KEY,
  STORAGE_KEY_EMPLOYEE,
  NOTIFICATION_TIME,
  NOTIFICATION_TIMER,
} from "./constants/constants.js";
import {
  escapeHtml,
  getNotificationStylesByStatus,
  getEmployeeIdFromUrl,
  redirectTo,
} from "./libs/libs.js";

const employeeId = getEmployeeIdFromUrl();
if (!employeeId) {
  redirectTo("index.html");
}
let countdown;
let timer = NOTIFICATION_TIMER;
const btnAdd = document.getElementById("add-btn");
const btnClose = document.getElementById("close-notification");
const table = document.getElementById("task-table");
const notification = document.getElementById("notification");
const notificationMessage = document.getElementById("notification-message");
const contentNotification = document.getElementById("content-notification");
const notificationTimer = document.getElementById("notification-timer");
const input = document.getElementById("todo-input");

const taskStorage = new TaskStorage(STORAGE_KEY);
const employeeStorage = new EmployeeStorage(STORAGE_KEY_EMPLOYEE);
const taskManager = new TaskManager(taskStorage.loadTasks());
const employeeManager = new EmployeeManager(employeeStorage.loadEmployees());

const currentemployee = employeeManager.getEmployee(employeeId);
if (!currentemployee) redirectTo("index.html");
document.querySelector("h1").textContent =
  `Task of ${currentemployee.getName()}`;
function renderTask() {
  const tasks = taskManager
    .getTasks()
    .filter((t) => t.getEmployeeId() === employeeId);
  table.innerHTML = tasks
    .map(
      (task, index) => `
    <tr>
        <td>${index + 1}</td>
        <td>${escapeHtml(task.getName())}</td>
        <td> ${task.getStatus()}</td>
         <td>
                <button data-action="change" data-id="${task.getId()}">Change Status</button>
                <button data-action="delete" data-id="${task.getId()}">Delete</button>
            </td>
    </tr>
`,
    )
    .join("");
}
table.addEventListener("click", (event) => {
  const btn = event.target.closest("button[data-action]");
  if (!btn) return;

  const { action, id } = btn.dataset;

  if (action === "change") {
    taskManager.changeTask(id);
    showNotification("success", "Success", "Task status updated successfully");
  }
  if (action === "delete") {
    taskManager.removeTask(id);
    showNotification("success", "Success", "Task deleted successfully");
  }

  taskStorage.saveTasks(taskManager.getTasks());
  renderTask();
});
function addTask() {
  const taskName = input.value.trim();
  if (!taskName) {
    showNotification("error", "Error", "Ten khong duoc de trong");
    return;
  }
  taskManager.addTask(taskName, employeeId);
  taskStorage.saveTasks(taskManager.getTasks());
  showNotification("success", "Success", " Them thanh cong");
  renderTask();
  input.value = "";
}
function startTimerNotification() {
  clearInterval(countdown);
  countdown = setInterval(() => {
    timer--;
    notificationTimer.textContent = `Notification will close in ${timer} seconds`;
    if (timer <= 0) {
      clearInterval(countdown);
      notification.style.display = "none";
    }
  }, NOTIFICATION_TIME);
}
function showNotification(type, title, message) {
  timer = NOTIFICATION_TIMER;
  notificationMessage.textContent = message;
  contentNotification.textContent = title;
  notification.style.display = "block";
  notificationTimer.textContent = `Notification will close in ${timer} seconds`;
  notification.style.border = getNotificationStylesByStatus(type);
  startTimerNotification();
}
btnAdd.addEventListener("click", addTask);
btnClose.addEventListener("click", () => (notification.style.display = "none"));
document
  .getElementById("back-btn")
  ?.addEventListener("click", () => redirectTo("index.html"));
renderTask();
