<template>
    <div v-if="productsList" :class="s.tableContainer">
        <div :class="s.tableHeader">
            <div :class="s.headerCell">ticle</div>
            <div :class="s.headerCell">
                <font-awesome-icon icon="fa-image" />
            </div>
            <div :class="s.headerCell">Название / Категория</div>
            <div :class="s.headerCell">Серия / Теги</div>
            <div :class="s.headerCell">Описание</div>
            <div :class="s.headerCell">
                <font-awesome-icon icon="fa-eye" />
            </div>
            <div :class="s.headerCell">Статус</div>
            <div :class="s.headerCell">Характеристики</div>
        </div>
        <product-info-row
            v-for="product in productsList"
            :key="'product_id_' + product.id"
            :product="product"
        ></product-info-row>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { ProductInfoRow } from '@/entities/ProductRow/ProductInfoRow';
import { useProductsStore } from '@/shared/models/products/useProductsStore';
import s from './style.module.css';

const productsStore = useProductsStore();
const productsList = computed(() => productsStore.productsList);

onMounted(() => {
    if (productsList.value.length === 0) productsStore.getProductsList('');
});
</script>

<style scoped></style>
