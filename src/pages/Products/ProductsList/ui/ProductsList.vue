<template>
    <div :class="s.pageWrapper">
        <filters-bar-products 
            :tags="props.tags"
            :series="props.series"
            :categories="props.categories"        
        />
        <products-info-table />
    </div>
</template>

<script setup lang="ts">
import { FiltersBarProducts } from '@/widgets/FiltersBarProducts';
import { ProductsInfoTable } from '@/widgets/ProductsInfoTable';
import { TDictionariesData } from '@/shared/models/dictionaries/types';
import s from './style.module.scss';

type Props = {
    tags: TDictionariesData['tags'];
    series: TDictionariesData['series'];
    categories: TDictionariesData['categories'];
};
const props = defineProps<Props>();
</script>

<style scoped></style>
