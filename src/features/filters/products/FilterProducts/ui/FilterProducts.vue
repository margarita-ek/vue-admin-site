<template>
    <div :class="s.filter">
        <Listbox v-model="selectedFilter">
            <ListboxButton :class="[s.filterBtn, selectedFilter ? s.filterBtnActive : '']">
                <span :class="s.filterBtnTitle">{{ label }}{{ displayLabel }}</span>
                <span v-if="selectedFilter" :class="s.filterBtnRemove"><font-awesome-icon icon="fa-close" @click.stop="clearFilter" /></span>
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
                        <input :class="[s.filterOptionInput]" type="radio" :checked="selected" />
                        <span :class="[s.filterOptionTitle]">{{ filter.name }}</span>
                    </li>
                </ListboxOption>
            </ListboxOptions>
        </Listbox>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';
import s from './style.module.scss';

type Filter = {
    id: number;
    name: string;
};

type Props = {
    label: string;
    query: string;
    filters?: Filter[];
};

const props = defineProps<Props>();
const selectedFilter = ref<Filter | null>(null);
const router = useRouter();
const displayLabel = computed(() => (selectedFilter.value ? `: ${selectedFilter.value.name}` : ''));

const clearFilter = () => {
    selectedFilter.value = null;
    const currentQuery = { ...router.currentRoute.value.query };
    delete currentQuery[props.query];
    router.push({ query: currentQuery });
};

watch(
    () => selectedFilter.value,
    (newValue) => {
        if (newValue) {
            const currentQuery = { ...router.currentRoute.value.query };
            currentQuery[props.query] = String(newValue.id);
            for (let key in currentQuery) {
                if (currentQuery[key] === '') delete currentQuery[key];
            }
            router.push({ query: currentQuery });
        }
    },
);

onMounted(() => {
    const currentQuery = { ...router.currentRoute.value.query };
    delete currentQuery['purpose'];
    delete currentQuery['categories'];
    delete currentQuery['series'];
    delete currentQuery['material'];
    delete currentQuery['scope'];
    router.push({ query: currentQuery });
});
</script>