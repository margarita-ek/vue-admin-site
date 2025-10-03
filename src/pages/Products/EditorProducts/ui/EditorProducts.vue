<template>
    <div :class="s.pageWrapper">
        <h1 :class="s.pageTitle">Продукт {{ productId }}</h1>
        <product-form />
    </div>
</template>

<script setup lang="ts">
import { ProductForm } from '@/widgets/ProductForm';
import { useRoute } from 'vue-router';
import s from './style.module.scss';

const route = useRoute();
const productId = route.params.id;
</script>

<style scoped></style>
