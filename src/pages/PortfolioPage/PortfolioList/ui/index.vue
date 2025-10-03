<template>
    <div :class="s.toolbar">
        <filters-bar-portfolio :divisions="divisions" :years="years" />
        <div>
            <button class="btn" :class="s.createBtn" @click.stop="portfolioStore.createProject()" title="Создать проект">Создать</button>
            <button class="btn" :class="s.updateBtn" @click.stop="reloadPage" title="Обновить список"><font-awesome-icon icon="fa-repeat" /></button>
        </div>
    </div>
    <div :class="s.pageWrapper">
        <portfolio-table :portfolio="portfolio" :divisions="divisions" />
    </div>
</template>

<script setup lang="ts">
import { FiltersBarPortfolio } from '@/widgets/FiltersBarPortfolio';
import { PortfolioTable } from '@/widgets/PortfolioTable';
import { usePortfolioStore } from '@/shared/models/portfolio/usePortfolioStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import s from './style.module.scss';

const portfolioStore = usePortfolioStore();
const { portfolio, divisions, years } = storeToRefs(portfolioStore);

const reloadPage = () => window.location.reload();

onMounted(async () => {
    portfolioStore.$reset();
    await portfolioStore.getPortfolioList('?per-page=500');
    await portfolioStore.getPortfolioDivisionsList();
    await portfolioStore.getPortfolioYearsList();
});
</script>