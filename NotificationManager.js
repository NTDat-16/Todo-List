import { NOTIFICATION_TIME, NOTIFICATION_TIMER } from './constants/constants.js';
import { getNotificationStylesByStatus } from './libs/libs.js';

export class NotificationManager {
    #countdown;
    #timer;
    #type;

    constructor(type) {
        this.#type = type; 
        this.#timer    = NOTIFICATION_TIMER;
    }

    show(type, title, message) {
        const { notification, notificationMessage, contentNotification, notificationTimer } = this.#type;

        this.#timer                      = NOTIFICATION_TIMER;
        notificationMessage.textContent  = message;
        contentNotification.textContent  = title;
        notification.style.display       = 'block';
        notificationTimer.textContent    = `Notification will close in ${this.#timer} seconds`;
        notification.style.border        = getNotificationStylesByStatus(type);

        this.#startTimer();
    }

    close() {
        this.#type.notification.style.display = 'none';
        clearInterval(this.#countdown);
    }

    #startTimer() {
        const { notification, notificationTimer } = this.#type;
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