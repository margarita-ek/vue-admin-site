export function stringToNumberArray(str: string) {
    const newSet = new Set<number>();
    const parts = str.split(',').map(item => item.trim());
    const numbers = parts.filter(item => item !== '').map(Number);
    numbers.forEach((num: number) => newSet.add(num));
    return [...newSet];
};