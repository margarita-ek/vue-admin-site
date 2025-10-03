<template>
    <div :class="s.tableContainer">
        <div :class="s.tableHeader">
            <div :class="s.headerCell" title="id">id</div>
            <div :class="s.headerCell">
                <font-awesome-icon icon="fa-image" />
            </div>
            <div :class="s.headerCell">Описание</div>
        </div>
        <article-row v-for="article in articles" 
            :key="article.id"
            :article="article" 
            :id="article.id"
            :is_visible="Boolean(article.is_visible)"
            :updated_at="formatDateFromSecToCalendar(+article.updated_at)"
            :division="divisions[article.division] ? divisions[article.division] : ''"
        />       
    </div>
    <p v-if="!articles.length" :class="s.searchMessage">Статьи не найдены</p>
    <loader-element v-if="loading" />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ArticleRow } from '@/entities/ArticleRow';
import { TDivisions } from '@/shared/models/portfolio/types';
import { useArticlesStore } from '@/shared/models/articles/useArticlesStore';
import { formatDateFromSecToCalendar } from '@/shared/utils/dateUtils';
import { LoaderElement } from '@/shared/ui/LoaderElement';
import { TArticle } from '@/shared/models/articles/types';
import s from './style.module.scss';

type Props = {
    articles: TArticle[];
    divisions: TDivisions;
};

const { articles, divisions } = defineProps<Props>();
const articlesStore = useArticlesStore();
const { loading } = storeToRefs(articlesStore);
</script>
