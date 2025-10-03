export const getItemFromLS = (key: string) => {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
};

export const addItemInLS = (key: string, value: unknown) => {
    sessionStorage.setItem(key, JSON.stringify(value));
};
