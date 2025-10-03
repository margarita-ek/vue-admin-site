<template>
    <div :class="s.pageWrapper">
        <categories-table />
    </div>
</template>

<script setup lang="ts">
import { CategoriesTable } from '@/widgets/CategoriesTable';
import s from './style.module.scss';
</script>

<style scoped></style>
