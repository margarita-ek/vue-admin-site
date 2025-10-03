<template>
    <div class="category-child" :style="maxHeightStyle">
        <category-item v-for="category in categories" :key="'category_id_' + category.id" :category="category" />
    </div>
</template>

<script setup lang="ts">
import { CategoryItem } from '@/entities/CategoryAccordion/CategoryItem/index';
import { Category } from '@/shared/models/categories/types';
import { computed } from 'vue';

type Props = {
    categories: Category[];
    isVisible: boolean;
    parentId: number;
};

const props = defineProps<Props>();

const maxHeightStyle = computed(() => ({
    maxHeight: props.isVisible ? props.categories.length * (props.parentId === 0 ? 200 : 40) + 'px' : '0',
}));
</script>

<style scoped>
.category-child {
    overflow: hidden;
    transition: max-height 0.5s ease;
}
</style>
