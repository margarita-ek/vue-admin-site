import { ref } from "vue";

type TSelectData = {id: number; name: string;};
type TTagRemove = {tag: number; product: number;};
type TTagCreate = {tag: number; product: number;};

export function dataConversionForTagsRequests(
    allRemovedTags: TSelectData[],
    allAddedTags: TSelectData[],
    productArrayWithId: number[]
) { 

    const remove = ref<TTagRemove[]>([]);
    const create = ref<TTagCreate[]>([]);

    productArrayWithId.forEach(productId => {
        allRemovedTags.forEach(tagRemoveObj => { 
            remove.value?.push({
                tag: tagRemoveObj.id,
                product: productId,
            });
        });
        allAddedTags.forEach(tagCreateObj => { 
            create.value?.push({
                tag: tagCreateObj.id,
                product: productId,
            });
        });
    });
    return {
        removeTags: remove.value,
        createTags: create.value,
    }
};