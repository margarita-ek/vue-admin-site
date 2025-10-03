export function debounce(callback: any, delay: number) {
    let timerId: ReturnType<typeof setTimeout>;

    return function(this: any, ...args: any[]) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
        callback.apply(this, args);
        }, delay);
    };
};
