<template>
    <div v-if="parentCategory">
        <h4 :class="s.menuLabel">Родительская категория</h4>
        <Menu as="div" :class="s.menu">
            <MenuButton :class="s.menuButton">{{ parentCategory.name }}</MenuButton>
            <MenuItems v-if="categoriesTwoLevel" as="ul" :class="s.menuItems">
                <MenuItem
                    v-for="category in categoriesTwoLevel"
                    :key="'category_id_' + category.id"
                    v-slot="{ active }"
                    @click="selectParent(category.id)"
                >
                    <div :class="[s.menuItem, { [s.menuItemActive]: active }]">
                        <span>{{ category.name }}</span>
                    </div>
                </MenuItem>
            </MenuItems>
        </Menu>
    </div>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { useDictionariesStore } from '@/shared/models/dictionaries/useDictionariesStore';
import { computed, ref, watch } from 'vue';
import s from './style.module.css';

type Props = {
    modelValue: number;
};

type Emits = {
    (e: 'update:modelValue', v: number): void;
};

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const parentCategoryId = ref<number>(props.modelValue);
const dictionariesStore = useDictionariesStore();

const categoriesTwoLevel = computed(() => dictionariesStore.categories.filter((category) => category.lvl === 2));
const parentCategory = computed(() =>
    categoriesTwoLevel.value.find((category) => category.id === parentCategoryId.value),
);
const selectParent = (id: number) => (parentCategoryId.value = id);

watch(
    () => parentCategoryId.value,
    (v) => emits('update:modelValue', v),
    { immediate: true },
);
</script>

<style scoped></style>
