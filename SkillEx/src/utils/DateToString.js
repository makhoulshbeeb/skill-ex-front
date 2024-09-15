export function dateToString(dateString) {
    const date = new Date(dateString);
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const day = padZero(date.getDate());
    const month = padZero(date.getMonth());
    const year = date.getFullYear();
    return `${day}/${month}/${year} at ${hours}:${minutes}`;
}

export function timeToString(dateString) {
    const date = new Date(dateString);
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    return `${hours}:${minutes}`;
}

function padZero(number) {
    return number.toString().padStart(2, "0");
}