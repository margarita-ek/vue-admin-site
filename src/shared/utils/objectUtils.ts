export const deepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

export const isEqual = <T>(obj1: T | undefined, obj2: T | undefined): boolean => {
    if (obj1 && obj2) {
        for (const key in obj1) {
            if (typeof obj1[key] === 'object' && obj1[key] !== null) {
                if (!isEqual(obj1[key], obj2[key])) return false;
            } else {
                if (obj1[key] != obj2[key]) return false;
            }
        }
    } else {
        return false;
    }
    return true;
};
