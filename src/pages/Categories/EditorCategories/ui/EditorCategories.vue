<template>
    <div :class="s.pageWrapper">
        <h1 :class="s.pageTitle">Категория {{ categoryId }}</h1>
        <category-form />
    </div>
</template>

<script setup lang="ts">
import { CategoryForm } from '@/widgets/CategoryForm';
import { useRoute } from 'vue-router';
import s from './style.module.scss';

const route = useRoute();
const categoryId = route.params.id;
</script>

<style scoped></style>
