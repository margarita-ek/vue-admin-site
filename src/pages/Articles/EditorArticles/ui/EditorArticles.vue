<template>
    <div :class="s.pageWrapper">
        <h1 :class="s.pageTitle">Статья {{ articleId }}</h1>
        <article-form />
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ArticleForm } from '@/widgets/ArticleForm';
import s from './style.module.scss';

const route = useRoute();
const articleId = route.params.id;
</script>

<style scoped></style>
