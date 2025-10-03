<template>
    <div :class="[s.category, category.level > '2' ? s.categorySmall : '']" @click="toggleCategories(category.id)">
        <div :class="s.cell">{{ category.id }}</div>
        <div :class="s.cell">
            <img v-if="category.icon" :src="category.icon" alt="Icon" />
        </div>
        <div :class="[s.cell, s.cellStart]" :style="{ paddingLeft: `${+category.level * 20}px` }">
            <router-link :to="`/edit/categories/${category.id}`" :class="s.cellLink" @click.stop>
                <span>{{ category.name }}</span>
            </router-link>
        </div>
        <div :class="[s.cell, s.cellIcon, isVisibleChildCategory ? s.cellIconActive : '']">
            <font-awesome-icon v-if="category.children && category.children.length > 0" icon="fa-angle-down" />
        </div>
    </div>
    <category-child
        v-if="category.children && category.children.length > 0"
        :categories="category.children"
        :is-visible="isVisibleChildCategory"
        :parent-id="category.parent"
    />
</template>

<script setup lang="ts">
import { Category } from '@/shared/models/categories/types';
import { CategoryChild } from '@/entities/CategoryAccordion/CategoryChild';
import s from './style.module.scss';
import { useCategoriesStore } from '@/shared/models/categories/useCategoriesStore';
import { computed } from 'vue';

type Props = {
    category: Category;
};

const props = defineProps<Props>();
const categoriesStore = useCategoriesStore();

const openedCategories = computed(() => categoriesStore.openedCategories);
const isVisibleChildCategory = computed(() => openedCategories.value.includes(props.category.id));
const toggleCategories = computed(() => categoriesStore.toggleCategories);
</script>

<style scoped></style>
