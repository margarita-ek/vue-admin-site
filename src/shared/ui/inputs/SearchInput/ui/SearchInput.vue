<template>
    <div :class="s.searchBlock">
        <input v-model="searchQuery" :class="s.searchInput" :placeholder="placeholder" @keydown.enter="handleSearch()" />
        <span v-if="!searchQuery.length"><font-awesome-icon icon="fa-magnifying-glass" :class="s.searchBtn" /></span>
        <span v-else><font-awesome-icon icon="fa-close" :class="s.removeBtn" @click.stop="clearLine" /></span>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import s from './style.module.scss';

type Props = {
    placeholder: string;
};

defineProps<Props>();
const searchQuery = ref<string>('');
const router = useRouter();
const handleSearch = () => {
const currentQuery = { ...router.currentRoute.value.query };
    if (searchQuery.value === '') {
        delete currentQuery['q'];
    } else {
        currentQuery['q'] = searchQuery.value;
    }
    router.push({ query: currentQuery });
};

function clearLine () {
    searchQuery.value = '';
};

watch(
    () => searchQuery.value,
    (v) => {
        if (v === '') {
            const currentQuery = { ...router.currentRoute.value.query };
            delete currentQuery['q'];
            router.push({ query: currentQuery });
        }
    },
);
</script>

<style scoped></style>