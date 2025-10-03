import { TProduct } from "../models/products/types";

export function filterDuplicateObjectsById(mainObj: TProduct[], passiveObj: TProduct[]){
    const passiveIds = new Set(passiveObj.map(item => item.id));
    const filteredMainObj = mainObj.filter(item => !passiveIds.has(item.id));
    return filteredMainObj;
};