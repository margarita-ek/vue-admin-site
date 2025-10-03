<template>
    <div>
        <div :class="s.filtersBar">
            <filter-products v-if="categoriesOptions.length > 0" label="Категория" query="categories"
                :filters="categoriesOptions" />
            <filter-products v-if="seriesOptions.length > 0" label="Серия" query="series" :filters="seriesOptions" />
            <filter-products-multiple v-if="purposeTagsOptions.length > 0" label="Назначение" query="purpose"
                :filters="purposeTagsOptions" />
            <filter-products-multiple v-if="materialTagsOptions.length > 0" label="Материал" query="material"
                :filters="materialTagsOptions" />
            <filter-products-multiple v-if="scopeTagsOptions.length > 0" label="Направление" query="scope"
                :filters="scopeTagsOptions" />
        </div>
        <div :class="s.filtersBarWithCheckbox">
            <input-checkbox :id="'new-items'" :label="'Новинки'" @selected="getSelectNewItems" />
            <input-checkbox :id="'inclusive'" :label="'Инклюзивное'" @selected="getSelectInclusive" />
            <input-checkbox :id="'in-stock'" :label="'В наличии'" @selected="getSelectInStock" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { FilterProducts } from '@/features/filters/products/FilterProducts';
import { FilterProductsMultiple } from '@/features/filters/products/FilterProductsMultiple';
import { InputCheckbox } from '@/shared/ui/inputs/InputCheckbox';
import s from './style.module.scss';
import { TDictionariesData } from '@/shared/models/dictionaries/types';

type Props = {
    tags: TDictionariesData['tags'];
    series: TDictionariesData['series'];
    categories: TDictionariesData['categories'];
};

const props = defineProps<Props>();
const router = useRouter();

const selectedNewItems = ref<boolean>(false);
const selectedInclusive = ref<boolean>(false);
const selectedInStock = ref<boolean>(false);

const categoriesOptions = computed(() => props.categories.map((category) => ({ id: category.id, name: category.name })),
);
const purposeTagsOptions = computed(() =>
    props.tags.reduce((acc: { id: number; name: string }[], curr: any) => {
        if (curr.type === 'purpose') acc.push({ id: curr.id, name: curr.label });
        return acc;
    }, []),
);
const materialTagsOptions = computed(() =>
    props.tags.reduce((acc: { id: number; name: string }[], curr: any) => {
        if (curr.type === 'material') acc.push({ id: curr.id, name: curr.label });
        return acc;
    }, []),
);
const scopeTagsOptions = computed(() =>
    props.tags.reduce((acc: { id: number; name: string }[], curr: any) => {
        if (curr.type === 'scope') acc.push({ id: curr.id, name: curr.label });
        return acc;
    }, []),
);
const seriesOptions = computed(() => props.series.map((series: any) => ({ id: series.id, name: series.name })));

const getSelectNewItems = (value: any) => selectedNewItems.value = value;
const getSelectInclusive = (value: any) => selectedInclusive.value = value;
const getSelectInStock = (value: any) => selectedInStock.value = value;

watch([selectedNewItems, selectedInclusive, selectedInStock], () => {
        const currentQuery = { ...router.currentRoute.value.query };
        
        if(selectedNewItems.value) {
            currentQuery['is-new'] = '1';
            router.push({ query: currentQuery })
        };
        if(!selectedNewItems.value) {
            delete currentQuery['is-new'];
            router.push({ query: currentQuery });
        };
        if(selectedInclusive.value) {
            currentQuery['inclusive'] = '1';
            router.push({ query: currentQuery })
        };
        if(!selectedInclusive.value) {
            delete currentQuery['inclusive'];
            router.push({ query: currentQuery });
        };
        if(selectedInStock.value) {
            currentQuery['in-stock'] = '1';
            router.push({ query: currentQuery })
        };
        if(!selectedInStock.value) {
            delete currentQuery['in-stock'];
            router.push({ query: currentQuery });
        };
    },
);

onMounted(() => {
    const currentQuery = { ...router.currentRoute.value.query };
    delete currentQuery['is-new'];
    delete currentQuery['inclusive'];
    delete currentQuery['in-stock'];
    router.push({ query: currentQuery });
});
</script>
