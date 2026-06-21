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
export function saveToStorage(key,data){
    localStorage.setItem(key,JSON.stringify(data));
}
// ham load du lieu tu local
export function loadFromStorage(key){
    return JSON.parse(localStorage.getItem(key)) ||[];

}
// ham style cho thong bao
export function getNotificationStylesByStatus(type) {
    switch (type) {
        case 'success': return '3px solid green';
        case 'error':   return '3px solid red';
        default:        return '3px solid gray';
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
        case 'employee': return 'Employee';
        case 'manager':  return 'Manager';
        default:         return position;
    }
}
export function validateInput(str) {
    return str.trim() !== '';
}
