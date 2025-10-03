import { TDictionariesData } from '@/shared/models/dictionaries/types';
import { TUpdateTags } from '@/shared/models/products/useProductsStore';
import { TProduct } from '@/shared/models/products/types';

// Фильтрация тегов по типу
export function filterTagsByType(tags: TDictionariesData['tags'], type: 'material' | 'purpose' | 'scope') {
    return tags.filter((tag) => tag.type === type);
}

// Поиска тегов в справочнике по ID
export function findTagsById(tagIds: number[], tags: TDictionariesData['tags']) {
    return tagIds
        .map((tagId) => tags.find((tag) => tag.id === tagId))
        .filter((tag) => !!tag)
        .filter((tag) => tag === tag);
}
export function findSeriesById(tagIds: number[], tags: TDictionariesData['series']) {
    return tagIds.map((tagId) => tags.find((tag) => tag.id === tagId)).filter((tag) => !!tag);
}

// Поиска добавленных тегов в справочнике по ID
export function findCreatedTagsById(
    createdTags: TUpdateTags['create'],
    tags: TDictionariesData['tags'],
    productId: number,
) {
    return createdTags
        .map((updateTag) => {
            const tag = tags.find((tag) => tag.id === updateTag.tag);
            return tag ? { ...tag, productId: updateTag.product } : null;
        })
        .filter((tag) => tag !== null)
        .filter((tag) => tag?.productId === productId);
}
export function findCreatedSeriesById(
    createdTags: TUpdateTags['create'],
    tags: TDictionariesData['series'],
    productId: number,
) {
    return createdTags
        .map((updateTag) => {
            const tag = tags.find((tag) => tag.id === updateTag.tag);
            return tag ? { ...tag, productId: updateTag.product } : null;
        })
        .filter((tag) => tag !== null)
        .filter((tag) => tag?.productId === productId);
}

// Поиск удаленных тегов в справочнике по ID
export function findRemovedTagsById(
    removedTags: TUpdateTags['remove'],
    tags: TDictionariesData['tags'],
    productId: number,
) {
    return removedTags
        .map((updateTag) => {
            const tag = tags.find((tag) => tag.id === updateTag.tag);
            return tag ? { ...tag, productId: updateTag.product } : null;
        })
        .filter((tag) => tag !== null)
        .filter((tag) => tag?.productId === productId);
}

export function findRemovedSeriesById(
    removedTags: TUpdateTags['remove'],
    tags: TDictionariesData['series'],
    productId: number,
) {
    return removedTags
        .map((updateTag) => {
            const tag = tags.find((tag) => tag.id === updateTag.tag);
            return tag ? { ...tag, productId: updateTag.product } : null;
        })
        .filter((tag) => tag !== null)
        .filter((tag) => tag?.productId === productId);
}

// Форматирование габаритов изделия в строку
export const formatProductDimensions = (dimensions: TProduct['dimensions']): string => {
    return [dimensions.length, dimensions.width, dimensions.height].filter((size) => !!size).join('x');
};

//Копирование значение в clipboard
export const copyToClipboard = (text: string | number) => {
    navigator.clipboard.writeText(text.toString());
};
