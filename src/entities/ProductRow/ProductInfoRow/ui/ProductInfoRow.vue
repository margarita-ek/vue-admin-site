<template>
    <div :class="s.tableRow">
        <div :class="s.cell">{{ product.id }} / {{ product.article }}</div>
        <div :class="s.cell">
            <img :src="product.img" alt="Prod" />
        </div>
        <router-link :to="`products/${product.id}`" :class="[s.cell, s.cellStart, s.cellLink]"
            >{{ product.name }} / {{ categoryProduct }}</router-link
        >
        <div :class="[s.cell, s.cellTags]">
            <ul :class="s.tagsList">
                <li
                    v-for="tag in seriesTagsInProduct"
                    :key="tag?.id"
                    :class="s.tag"
                    :style="tag?.color ? { background: tag.color } : { background: 'rgb(197, 197, 197)' }"
                >
                    {{ tag?.name }}
                </li>
                <li
                    v-for="tag in tagsInProduct"
                    :key="tag?.id"
                    :class="s.tag"
                    :style="tag?.color ? { background: tag.color } : { background: 'rgb(197, 197, 197)' }"
                >
                    {{ tag?.label }}
                </li>
            </ul>
        </div>
        <div :class="[s.cell, s.cellStart]">{{ product.description }}</div>
        <div :class="s.cell">
            <toggle-element-read-only :enabled="isVisibleProduct" />
        </div>
        <div :class="s.cell">{{ statusProduct }}</div>
        <div :class="s.cell">{{ formatProductDimensions(product.dimensions) }}</div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ToggleElementReadOnly } from '@/shared/ui/ToggleElementReadOnly';
import { formatProductDimensions } from '@/entities/ProductRow/lib';
import { useDictionariesStore } from '@/shared/models/dictionaries/useDictionariesStore';
import { findSeriesById, findTagsById } from '@/entities/ProductRow/lib';
import { TProduct } from '@/shared/models/products/types';
import s from './style.module.scss';

type Props = {
    product: TProduct;
};

const props = defineProps<Props>();

const dictionariesStore = useDictionariesStore();

const tags = computed(() => dictionariesStore.tags);
const seriesTags = computed(() => dictionariesStore.series);
const status = computed(() => dictionariesStore.status);
const categories = computed(() => dictionariesStore.categories);

const tagsInProduct = computed(() => findTagsById(props.product.tags, tags.value));
const seriesTagsInProduct = computed(() => findSeriesById(props.product.series, seriesTags.value));
const categoryProduct = computed(
    () => categories.value.find((category) => category.id === props.product.categoryId)?.name,
);
const statusProduct = computed(() => (status.value ? status.value[props.product.status] : ''));
const isVisibleProduct = computed(() => !!props.product.is_visible);
</script>

<style scoped></style>
