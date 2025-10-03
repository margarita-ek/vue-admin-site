<template>
    <div :class="[s.cell, s.cellTags]">
        <ul :class="s.tagsList">
            <li
                v-for="tag in tagsInProduct"
                :key="tag?.id"
                :class="tagType === 'tags' ? s.tag : s.tagSeries"
                :style="tagStyle(tag?.color)"
                @click="removeTag(tag.id, tagType)"
            >
            {{ tagType === 'tags' ? tag?.label : tag?.name }}
            </li>
            <li
                v-for="tag in createdTags"
                :key="tag?.id"
                :class="[tagType === 'tags' ? s.tag : s.tagSeries, s.tagCreated]"
                @click="returnCreatedTag(tag.id)"
            >
            {{ tagType === 'tags' ? tag?.label : tag?.name }}
            </li>
            <li
                v-for="tag in removedTags"
                :key="tag?.id"
                :class="[tagType === 'tags' ? s.tag : s.tagSeries, s.tagRemoved]"
                @click="returnRemovedTag(tag.id, tagType)"
            >
            {{ tagType === 'tags' ? tag?.label : tag?.name }}
            </li>
        </ul>
        <div v-if="filteredTagsForDropdown.length" :class="s.cellButton">
            <tags-dropdown 
                v-model="modelValue" 
                :tags="filteredTagsForDropdown" 
                :product-id="product.id"
                :tagType="tagType" 
            />
        </div>
        <div v-else></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, computed } from 'vue';
import { TagsDropdown } from '@/shared/ui/TagsDropdown';
import { useProductsStore } from '@/shared/models/products/useProductsStore';
import { TProduct } from '@/shared/models/products/types';
import s from '@/entities/ProductRow/ProductTagsRow/ui/style.module.scss';

const props = defineProps<{
    product: TProduct;
    tagType: 'tags' | 'series';
    tagsInProduct: any;
    createdTags: any;
    removedTags: any;
    tagsForDropdown: any;
    query: string;
}>();

const productsStore = useProductsStore();
const editedProduct = reactive<TProduct>({ ...props.product });
const modelValue = ref<number[]>([]);

const removeTag = (tagId: number, tagType: 'tags' | 'series') => {
    const index = editedProduct[tagType].indexOf(tagId);
    if (index !== -1) {
        editedProduct[tagType].splice(index, 1);
        productsStore.tagsRequests.remove.push({ tag: tagId, product: props.product.id });
    }
};
const returnCreatedTag = (tagId: number) => {
    productsStore.tagsRequests.create = productsStore.tagsRequests.create.filter(
    (tag) => tag.tag !== tagId || tag.product !== props.product.id);
};
const returnRemovedTag = (tagId: number, tagType: 'tags' | 'series') => {
    const index = productsStore.tagsRequests.remove.findIndex(
    (tag) => tag.tag === tagId && tag.product === props.product.id);
    if (index !== -1) {
        productsStore.tagsRequests.remove.splice(index, 1);
        editedProduct[tagType].push(tagId);
    }
};
const filteredTagsForDropdown = computed(() => {
    return props.tagsForDropdown.filter((tag: any) => {
        const tagName = props.tagType === 'tags' ? tag.label : tag.name;
        return !props.tagsInProduct.find((productTag: any) => productTag.label === tagName || productTag.name === tagName);
    });
});
const tagStyle = (color: string | null | undefined) => {
    return color ? { background: color } : { color: '#333333', background: 'white', border: '1px solid #333333' };
};

onMounted(()=>{
    modelValue.value = props.tagType === 'tags' ? editedProduct.tags : editedProduct.series;
});
</script>