<template>
    <div :class="s.filtersBar">
        <filter-portfolio
            label="Период"
            query="year"
            :filters="years"
        />
        <filter-portfolio
            label="Рубрика" 
            query="division"
            :filters="divisions"
        />
    </div>
</template>

<script setup lang="ts">
import { FilterPortfolio } from '@/features/filters/portfolio/FilterPortfolio';
import { TDivisions } from '@/shared/models/portfolio/types';
import s from './style.module.scss';

type Props = {
    years: number[];
    divisions: TDivisions;
};

const { years, divisions } = defineProps<Props>();
</script>