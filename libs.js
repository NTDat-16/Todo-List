// ham xu ly khi name truyen vao 
export function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
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