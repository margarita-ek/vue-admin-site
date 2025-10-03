<template>
    <div :class="s.tableContainer">
        <div :class="s.tableHeader">
            <div :class="s.headerCell" title="id">id</div>
            <div :class="s.headerCell">
                <font-awesome-icon icon="fa-image" />
            </div>
            <div :class="s.headerCell">Описание</div>
        </div>
        <project-row :project="project" :is_visible="Boolean(project.is_visible)" :updated_at="formatDateFromSecToCalendar(+project.updated_at)" v-for="project in portfolio" :key="project.id"
            :division="divisions[project.division] ? divisions[project.division] : ''" :id="project.id"/>
    </div>
    <p v-if="!portfolio.length" :class="s.searchMessage">Проекты не найдены</p>
    <loader-element v-if="loading"/>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ProjectRow } from '@/entities/ProjectRow';
import { formatDateFromSecToCalendar } from '@/shared/utils/dateUtils';
import { TDivisions, TProject } from '@/shared/models/portfolio/types';
import { usePortfolioStore } from '@/shared/models/portfolio/usePortfolioStore';
import { LoaderElement } from '@/shared/ui/LoaderElement';
import s from './style.module.scss';

type Props = {
    portfolio: TProject[];
    divisions: TDivisions;
};

const { portfolio, divisions } = defineProps<Props>();
const portfolioStore = usePortfolioStore();
const { loading } = storeToRefs(portfolioStore);
</script>