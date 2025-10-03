<template>
    <div :class="s.toolbar">
        <filters-bar-portfolio :divisions="divisions" :years="years" />
        <div>
            <button class="btn" :class="s.createBtn" @click.stop="arcticlesStore.createArticle()" title="Создать проект">Создать</button>
            <button class="btn" :class="s.updateBtn" @click.stop="reloadPage" title="Обновить список"><font-awesome-icon icon="fa-repeat" /></button>
        </div>    
    </div>
    <div :class="s.pageWrapper">
        <articles-table :articles="articlesList" :divisions="divisions"/>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { FiltersBarPortfolio } from '@/widgets/FiltersBarPortfolio';
import { ArticlesTable } from '@/widgets/ArticlesTable';
import { useArticlesStore } from '@/shared/models/articles/useArticlesStore';
import s from './style.module.scss';

const arcticlesStore = useArticlesStore();
const { articlesList, divisions, years } = storeToRefs(arcticlesStore);

const reloadPage = () => window.location.reload();

onMounted(async () => {
    await arcticlesStore.getArticlesList('?per-page=500');
    await arcticlesStore.getArticlesDivisionsList();
    await arcticlesStore.getArticlesYearsList();
});
</script>
