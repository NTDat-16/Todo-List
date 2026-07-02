import { NOTIFICATION_TIME, NOTIFICATION_TIMER } from './constants/constants.js';
import { getNotificationStylesByStatus } from './libs/libs.js';
export class NotificationManager {
    #countdown;
    #timer = NOTIFICATION_TIMER;
    #elements = {};
    init() {
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `
            display: none; position: fixed; top: 20px; right: 20px;
            width: 320px; padding: 16px; background: white;
            border-radius: 8px; box-shadow: 0 8px 24px rgba(0,0,0,0.15); z-index: 1000;
        `;
        const title = document.createElement('p');
        title.style.cssText = 'font-size:18px; font-weight:bold; margin-bottom:8px;';
        const message = document.createElement('p');
        message.style.marginBottom = '10px';
        const timer = document.createElement('p');
        timer.style.cssText = 'font-size:13px; color:#666; margin-bottom:10px;';
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Close';
        closeBtn.style.width = '100%';
        closeBtn.addEventListener('click', () => this.close());
        wrapper.append(title, message, timer, closeBtn);
        document.body.appendChild(wrapper);
        this.#elements = {
            notification: wrapper,
            notificationMessage: message,
            contentNotification: title,
            notificationTimer: timer,
        };
        return this;
    }
    success(message) { this.#show('success', 'Success', message); }
    error(message) { this.#show('error', 'Error', message); }
    warning(message) { this.#show('warning', 'Warning', message); }
    #show(type, title, message) {
        const { notification, notificationMessage, contentNotification, notificationTimer } = this.#elements;
        this.#timer = NOTIFICATION_TIMER;
        notificationMessage.textContent = message;
        contentNotification.textContent = title;
        notificationTimer.textContent = `Notification will close in ${this.#timer} seconds`;
        notification.style.display = 'block';
        notification.style.border = getNotificationStylesByStatus(type);
        this.#startTimer();
    }
    close() {
        this.#elements.notification.style.display = 'none';
        clearInterval(this.#countdown);
    }
    #startTimer() {
        const { notification, notificationTimer } = this.#elements;
        clearInterval(this.#countdown);
        this.#countdown = setInterval(() => {
            this.#timer--;
            notificationTimer.textContent = `Notification will close in ${this.#timer} seconds`;
            if (this.#timer <= 0) {
                clearInterval(this.#countdown);
                notification.style.display = 'none';
            }
        }, NOTIFICATION_TIME);
    }
}
//# sourceMappingURL=NotificationManager.js.map