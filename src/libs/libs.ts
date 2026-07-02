export function escapeHtml(str: string): string {
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

export function saveToStorage(key: string, data: unknown): void {
    localStorage.setItem(key, JSON.stringify(data));
}

export function loadFromStorage(key: string): any[] {
    return JSON.parse(localStorage.getItem(key) || '[]');
}

export function getNotificationStylesByStatus(type: string): string {
    switch (type) {
        case 'success': return '3px solid green';
        case 'error':   return '3px solid red';
        default:        return '3px solid gray';
    }
}

export function getEmployeeIdFromUrl(): string | null {
    return new URLSearchParams(window.location.search).get('employeeId');
}

export function redirectTo(url: string): void {
    window.location.href = url;
}

export function createInputValidator(input: HTMLInputElement) {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'position:relative; display:inline-block; width:calc(100% - 88px);';
    input.parentNode!.insertBefore(wrapper, input);
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
        validate(message: string): boolean {
            if (!input.value.trim()) {
                errorEl.textContent  = message;
                errorEl.style.display = 'block';
                input.style.border   = '1px solid red';
                return false;
            }
            errorEl.style.display = 'none';
            input.style.border    = '';
            return true;
        },
        clear(): void {
            errorEl.style.display = 'none';
            input.style.border    = '';
        }
    };
}