// ham xu ly khi name truyen vao
export function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\//g, '&#x2F;')
    .replace(/`/g, '&#x60;')
    .replace(/=/g, '&#x3D;');
}
//luu du lieu vao local
export function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// ham load du lieu tu local
export function loadFromStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}
// ham style cho thong bao
export function getNotificationStylesByStatus(type) {
  switch (type) {
    case 'success':
      return '3px solid green';
    case 'error':
      return '3px solid red';
    default:
      return '3px solid gray';
  }
}
export function getEmployeeIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('employeeId');
}
export function redirectTo(url) {
  window.location.href = url;
}
export function formatPosition(position) {
  switch (position) {
    case 'employee':
      return 'Employee';
    case 'manager':
      return 'Manager';
    default:
      return position;
  }
}
export function validateInput(str) {
  return str.trim() !== '';
}

export function clearInputError(input) {
  const error = input.nextElementSibling;
  if (error && error.classList.contains('input-error')) {
    error.textContent = '';
  }
  input.style.border = '';
}
export function createInputValidator(input) {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'position: relative; display: inline-block; width: calc(100% - 88px);';

  input.parentNode.insertBefore(wrapper, input);
  wrapper.appendChild(input);
  input.style.width = '100%';

  const errorEl = document.createElement('span');
  errorEl.style.cssText = `
        color: red;
        font-size: 13px;
        display: none;
        position: absolute;  
        top: 100%;
        left: 0;
        margin-top: 2px;
    `;
  wrapper.appendChild(errorEl);

  return {
    validate(message) {
      if (!input.value.trim()) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
        input.style.border = '1px solid red';
        return false;
      }
      errorEl.style.display = 'none';
      input.style.border = '';
      return true;
    },
    clear() {
      errorEl.style.display = 'none';
      input.style.border = '';
    },
  };
}
