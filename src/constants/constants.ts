export const STORAGE_KEY = 'tasks';
export const NOTIFICATION_TIME = 1000;
export const NOTIFICATION_TIMER = 5;

export const TASK_STATUS = {
  PENDING: 'pending',
  DONE: 'done',
} as const;

export const STORAGE_KEY_EMPLOYEE = 'employees';

export const EMPLOYEE_POSITION = {
  EMPLOYEE: 'employee',
  MANAGER: 'manager',
} as const;

export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];
export type EmployeePosition = (typeof EMPLOYEE_POSITION)[keyof typeof EMPLOYEE_POSITION];
