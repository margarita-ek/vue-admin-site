<template>
    <div :class="s.filter">
        <Listbox v-model="selectedFilter" multiple>
            <ListboxButton :class="[s.filterBtn, selectedFilter.length > 0 ? s.filterBtnActive : '']">
                <span :class="s.filterBtnTitle">{{ label }}{{ displayLabel }}</span>
                <span v-if="selectedFilter.length > 0" :class="s.filterBtnRemove"><font-awesome-icon icon="fa-close" @click.stop="clearFilter" /></span>
                <font-awesome-icon v-else icon="fa-chevron-down" />
            </ListboxButton>
            <ListboxOptions :class="s.filterOptions">
                <ListboxOption
                    v-for="filter in filters"
                    :key="filter.id"
                    v-slot="{ active, selected }"
                    :value="filter"
                    as="template"
                >
                    <li :class="[s.filterOption, active ? s.filterOptionActive : '']">
                        <input :class="s.filterOptionInputCheckbox" type="checkbox" :checked="selected" />
                        <span :class="s.filterOptionTitleCheckbox">{{ filter.name }}</span>
                    </li>
                </ListboxOption>
            </ListboxOptions>
        </Listbox>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';
import s from '../../FilterProducts/ui/style.module.scss';

type Filter = {
    id: number;
    name: string;
};

type Props = {
    label: string;
    query: string;
    filters: Filter[];
};

const props = defineProps<Props>();
const selectedFilter = ref<Filter[]>([]); //тут все выбранные элементы списка
const router = useRouter();
const displayLabel = computed(() => (selectedFilter.value.length > 0 ? `: ${selectedFilter.value.length}` : ''));

const clearFilter = () => (selectedFilter.value = []);

watch(
    () => selectedFilter.value,
    (newValue) => {
        const currentQuery = { ...router.currentRoute.value.query };
        currentQuery[props.query] = newValue.map((filter) => filter.id).join('_');
        
        for (let key in currentQuery) {
            if (currentQuery[key] === '') delete currentQuery[key];
        }
        router.push({ query: currentQuery });
    },
);
</script>
