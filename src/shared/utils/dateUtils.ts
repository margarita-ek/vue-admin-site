export function formatDateFromSec(sec: number) {
    const date = new Date(sec * 1000);
    return date.toLocaleDateString('ru-RU', {year:'numeric', month:'numeric', day:'numeric'});
};

export function formatDateToSec(dateString: string | number) {
    const date = new Date(dateString).getTime();
    return date / 1000;
};

export function formatDateFromSecToCalendar(sec: any) {
    const date = new Date(sec * 1000);
    const year: any = date.getFullYear();
    let month: any = date.getMonth() + 1;
    let day: any = date.getDate();
    if (month < 10) {
        month = '0' + month;
    };
    if (day < 10) {
        day = '0' + day;
    };
    return year + '-' + month + '-' + day;      
};
