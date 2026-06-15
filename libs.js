// ham xu ly khi name truyen vao 
export function escapeHtml(str){
    const div= document.createElement('div');
    div.textContent= str;
    return div.innerHTML;
}
//luu du lieu vao local
export function saveToStorage(key,data){
    localStorage.setItem(key,JSON.stringify(data));
}
// ham load du lieu tu local
export function loadFromStorage(key){
    return JSON.parse(localStorage.getItem(key)) ||[];

}