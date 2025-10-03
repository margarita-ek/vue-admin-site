<template>
    <div v-if="categoriesList" :class="s.tableContainer">
        <div :class="s.tableHeader">
            <div :class="s.headerCell">ID</div>
            <div :class="s.headerCell">Иконка</div>
            <div :class="s.headerCell">Наименование</div>
            <div :class="s.headerCell"></div>
        </div>
        <category-item v-for="category in categoriesList" :key="'category_id_' + category.id" :category="category" />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { CategoryItem } from '@/entities/CategoryAccordion/CategoryItem/index';
import { useCategoriesStore } from '@/shared/models/categories/useCategoriesStore';
import s from './style.module.scss';

const categoriesStore = useCategoriesStore();
const categoriesList = computed(() => categoriesStore.categoriesList);

onMounted(() => {
    if (categoriesList.value.length === 0) categoriesStore.getCategoriesList();
});
</script>

<style scoped></style>
