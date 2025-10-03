import { defineStore } from 'pinia';
import { ref } from 'vue';
import { dictionariesAPI } from '@/shared/api/dictionariesAPI';
import { TDictionariesData } from '@/shared/models/dictionaries/types';

export const useDictionariesStore = defineStore('dictionaries', () => {
    const categories = ref<TDictionariesData['categories']>([]);
    const series = ref<TDictionariesData['series']>([]);
    const tags = ref<TDictionariesData['tags']>([]);
    const ages = ref<TDictionariesData['ages']>([]);
    const divisions = ref<TDictionariesData['divisions']>([]);
    const filters = ref<TDictionariesData['filters']>();
    const status = ref<TDictionariesData['status']>();

    async function getDictionaries() {
        try {
            const res = await dictionariesAPI.loadDictionaries();
            if(res.data && res.status === 200) {
                const data: TDictionariesData = res.data;
                categories.value = data.categories;
                series.value = data.series;
                tags.value = data.tags;
                ages.value = data.ages;
                divisions.value = data.divisions;
                filters.value = data.filters;
                status.value = data.status;
            }
        } catch (e) {
            console.error(e);
        }
    }

    return {
        categories,
        series,
        tags,
        ages,
        divisions,
        filters,
        status,
        getDictionaries,
    };
});
