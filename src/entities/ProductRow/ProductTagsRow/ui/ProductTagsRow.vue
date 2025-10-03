<template>
    <div :key="product.id" :class="s.tableRow">
        <div :class="[s.cell, s.cellStart]">
            <div class="item-id" :title="product.id.toString()" @click="copyToClipboard(product.id)">{{ product.id }}
            </div>
            <div class="article" :title="product.article" @click="copyToClipboard(product.article)">{{ product.article}}</div>
        </div>
        <div :class="[s.cell, s.cellWithImg]" @click="showModalWindow">
            <img :src="product.img" :alt="product.name" />
        </div>
        <modal-window v-if="showModal" @close="closeModalWindow">
            <img :src="product.img" :alt="product.name">
        </modal-window>
        <div :class="[s.cell, s.cellStart]" :title="product.name" @click="copyToClipboard(product.name)">{{ product.name
            }}</div>
        <product-tag-display v-if="materialTags.length" :product="product" :tagType="'tags'"
            :tagsInProduct="materialTagsInProduct" :createdTags="createdMaterialTagsInProduct"
            :removedTags="removedMaterialTagsInProduct" :tagsForDropdown="materialTags" query="material"/>
        <product-tag-display v-if="purposeTags.length" :product="product" :tagType="'tags'"
            :tagsInProduct="purposeTagsInProduct" :createdTags="createdPurposeTagsInProduct"
            :removedTags="removedPurposeTagsInProduct" :tagsForDropdown="purposeTags" query="purpose"/>
        <product-tag-display v-if="scopeTags.length" :product="product" :tagType="'tags'"
            :tagsInProduct="scopeTagsInProduct" :createdTags="createdScopeTagsInProduct"
            :removedTags="removedScopeTagsInProduct" :tagsForDropdown="scopeTags" query="scope"/>
        <product-tag-display v-if="series.length" :product="product" :tagType="'series'"
            :tagsInProduct="seriesTagsInProduct" :createdTags="createdSeriesTagsInProduct"
            :removedTags="removedSeriesTagsInProduct" :tagsForDropdown="series" query="series"/>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useProductsStore } from '@/shared/models/products/useProductsStore';
import { ModalWindow } from '@/widgets/ModalWindow';
import { ProductTagDisplay } from '@/entities/ProductRow/ProductTagDisplay';
import { TDictionariesData } from '@/shared/models/dictionaries/types';
import { TProduct } from '@/shared/models/products/types';
import s from './style.module.scss';
import {
    filterTagsByType,
    findCreatedSeriesById,
    findCreatedTagsById,
    findRemovedSeriesById,
    findRemovedTagsById,
    findSeriesById,
    findTagsById,
    copyToClipboard,
} from '@/entities/ProductRow/lib';

type Props = {
    product: TProduct;
    tags: TDictionariesData['tags'];
    series: TDictionariesData['series'];
};

const emit = defineEmits(['changedProducts'])
const props = defineProps<Props>();

const productsStore = useProductsStore();
const editedProduct = reactive<TProduct>({ ...props.product });
const showModal = ref<boolean>(false);

const createdTags = computed(() => productsStore.tagsRequests.create);
const removedTags = computed(() => productsStore.tagsRequests.remove);

const materialTags = computed(() => filterTagsByType(props.tags, 'material'));
const purposeTags = computed(() => filterTagsByType(props.tags, 'purpose'));
const scopeTags = computed(() => filterTagsByType(props.tags, 'scope'));

const materialTagsInProduct = computed(() => findTagsById(editedProduct.tags, materialTags.value));
const purposeTagsInProduct = computed(() => findTagsById(editedProduct.tags, purposeTags.value));
const scopeTagsInProduct = computed(() => findTagsById(editedProduct.tags, scopeTags.value));
const seriesTagsInProduct = computed(() => findSeriesById(editedProduct.series, props.series));

const createdMaterialTagsInProduct = computed(() =>
    findCreatedTagsById(createdTags.value, materialTags.value, props.product.id),
);
const createdPurposeTagsInProduct = computed(() =>
    findCreatedTagsById(createdTags.value, purposeTags.value, props.product.id),
);
const createdScopeTagsInProduct = computed(() =>
    findCreatedTagsById(createdTags.value, scopeTags.value, props.product.id),
);
const createdSeriesTagsInProduct = computed(() =>
    findCreatedSeriesById(createdTags.value, props.series, props.product.id),
);

const removedMaterialTagsInProduct = computed(() =>
    findRemovedTagsById(removedTags.value, materialTags.value, props.product.id),
);
const removedPurposeTagsInProduct = computed(() =>
    findRemovedTagsById(removedTags.value, purposeTags.value, props.product.id),
);
const removedScopeTagsInProduct = computed(() =>
    findRemovedTagsById(removedTags.value, scopeTags.value, props.product.id),
);
const removedSeriesTagsInProduct = computed(() =>
    findRemovedSeriesById(removedTags.value, props.series, props.product.id),
);

const showModalWindow = () => {
    document.body.classList.add('scrollHidden');
    showModal.value = true;
};
const closeModalWindow = () => {
    document.body.classList.remove('scrollHidden');
    showModal.value = false;
};

watch([
    createdMaterialTagsInProduct,
    createdPurposeTagsInProduct,
    createdScopeTagsInProduct,
    createdSeriesTagsInProduct,
    removedMaterialTagsInProduct,
    removedPurposeTagsInProduct,
    removedScopeTagsInProduct,
    removedSeriesTagsInProduct,
], () => {
    const setWithId: number[] = [];

    if (createdMaterialTagsInProduct.value.length) { 
        createdMaterialTagsInProduct.value.forEach((tag: any) => setWithId.push(tag.productId));
        emit('changedProducts', ...Array.from(setWithId));
    };
    if (createdPurposeTagsInProduct.value.length) { 
        createdPurposeTagsInProduct.value.forEach((tag: any) => setWithId.push(tag.productId));
        emit('changedProducts', ...Array.from(setWithId));
    };
    if (createdScopeTagsInProduct.value.length) { 
        createdScopeTagsInProduct.value.forEach((tag: any) => setWithId.push(tag.productId));
        emit('changedProducts', ...Array.from(setWithId));
    };
    if (createdSeriesTagsInProduct.value.length) { 
        createdSeriesTagsInProduct.value.forEach((tag: any) => setWithId.push(tag.productId));
        emit('changedProducts', ...Array.from(setWithId));
    };

    if (removedMaterialTagsInProduct.value.length) { 
        removedMaterialTagsInProduct.value.forEach((tag: any) => setWithId.push(tag.productId));
        emit('changedProducts', ...Array.from(setWithId));
    };
    if (removedPurposeTagsInProduct.value.length) { 
        removedPurposeTagsInProduct.value.forEach((tag: any) => setWithId.push(tag.productId));
        emit('changedProducts', ...Array.from(setWithId));
    };
    if (removedScopeTagsInProduct.value.length) { 
        removedScopeTagsInProduct.value.forEach((tag: any) => setWithId.push(tag.productId));
        emit('changedProducts', ...Array.from(setWithId));
    };
    if (removedSeriesTagsInProduct.value.length) { 
        removedSeriesTagsInProduct.value.forEach((tag: any) => setWithId.push(tag.productId));
        emit('changedProducts', ...Array.from(setWithId));
    };
}, { deep: true });
</script>

<style scoped></style>
