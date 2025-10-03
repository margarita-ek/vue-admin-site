<template>
    <div v-if="productsList" :class="s.tableContainer">
        <div :class="s.tableHeader">
            <div :class="s.headerCell" title="id/article">id/<wbr>ar<wbr>ti<wbr>cle</div>
            <div :class="s.headerCell">
                <font-awesome-icon icon="fa-image" />
            </div>
            <div :class="s.headerCell" title="Наименование">Наи&shy;ме&shy;но&shy;ва&shy;ние</div>
            <div :class="s.headerCell" title="Материал">Ма&shy;те&shy;риал</div>
            <div :class="s.headerCell" title="Назначение">Наз&shy;наче&shy;ние</div>
            <div :class="s.headerCell" title="Направление">На&shy;пра&shy;вле&shy;ние</div>
            <div :class="s.headerCell" title="Серия">Се&shy;рия</div>
        </div>
        <template v-if="!selectedChanged && productsList.length">
            <product-tags-row v-for="product in productsList" :key="'product_id_' + product.id" :product="product"
                :tags="props.tags" :series="props.series" @changedProducts="getIdOfChangedProducts"></product-tags-row>
        </template>
        <template v-else-if="selectedChanged && [...changedProductsFiltered].length">
            <product-tags-row v-for="product in [...changedProductsFiltered]" :key="'product_id_' + product.id"
                :product="product" :tags="props.tags" :series="props.series"
                @changedProducts="getIdOfChangedProducts"></product-tags-row>
        </template>
    </div>
    <p v-if="productsList.length !== totalCount && !selectedChanged" :class="s.loadBtn" @click="getPartProductsList">
        Загрузить ещё</p>
    <p v-if="!productsList.length ||
        selectedChanged && ![...changedProductsFiltered].length" :class="s.searchMessage">
        Продукт не найден</p>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useProductsStore } from '@/shared/models/products/useProductsStore';
import { ProductTagsRow } from '@/entities/ProductRow/ProductTagsRow';
import { TDictionariesData } from '@/shared/models/dictionaries/types';
import s from './style.module.scss';

const productsStore = useProductsStore();
const { selectedChanged, pageSize, totalCount, changedProducts, productsList } = storeToRefs(productsStore); //selectedChanged состояние чекбокса Измененные

const idOfChangedProducts = ref<any>(new Set()); //id измененных row

const currentPage = ref<number>(1);
const totalPages = computed(() => Math.ceil(totalCount.value / pageSize.value));
const changedProductsFiltered = ref<any>([]);

type Props = {
    tags: TDictionariesData['tags'];
    series: TDictionariesData['series'];
};

const props = defineProps<Props>();

const getIdOfChangedProducts = (value: any) => {
    idOfChangedProducts.value.add(value);
};

const getPartProductsList = () => { 
    if (currentPage.value < totalPages.value) { 
        currentPage.value = ++currentPage.value;
    };
};

watch(currentPage, () => { 
    productsStore.getPartOfTheDataForProductsList(currentPage.value);
}, { deep: true });

watch(idOfChangedProducts, () => { 
    const arrayWithId = [...idOfChangedProducts.value];
    if (arrayWithId.length) { 
        arrayWithId.forEach((idChangedProduct: any) => {
            productsList.value.forEach((product: any) => { 
                if (product.id == idChangedProduct) { 
                    changedProducts.value.push(product);
                };
            });
        });
    };
}, { deep: true });

watch(changedProducts, ()=>{
    changedProductsFiltered.value = changedProducts.value.reduce((acc: any, current: any) => {
        if (!acc.some((item: any) => item.id === current.id)) {
            acc.push(current);
        }
        return acc;
    }, []);
}, {deep: true});

onMounted(() => {
    if (productsList.value.length === 0) productsStore.getProductsList(`?per-page=${pageSize.value}&page=${currentPage.value}`);
});
</script>
