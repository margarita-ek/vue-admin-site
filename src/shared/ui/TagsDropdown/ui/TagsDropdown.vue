<template>
    <Menu>
        <MenuButton :class="s.menuButton">
            <font-awesome-icon icon="fa-plus" />
        </MenuButton>
        <MenuItems as="ul" :class="s.menuItems">
            <MenuItem v-for="tag in tags" :key="'tag_id_' + tag.id" v-slot="{ active }">
                <div :class="[s.menuItem, { [s.menuItemActive]: active }]" @click="addTag(tag.id)">
                    <span>{{ tagType === 'tags' ? tag?.label : tag?.name }}</span>
                </div>
            </MenuItem>
        </MenuItems>
    </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { TSeries, TTags } from '@/shared/models/dictionaries/types';
import { useProductsStore } from '@/shared/models/products/useProductsStore';
import s from './style.module.scss';

type Props = {
    modelValue: number[];
    productId: number;
    tags?: TTags[] | TSeries[] | any;
    tagType: 'tags' | 'series';
};

const props = defineProps<Props>();
const productsStore = useProductsStore();

const tags = props.tags;

const addTag = (id: number) => {
    const findTag =
        productsStore.tagsRequests.create.find((tag) => tag.tag === id && tag.product === props.productId) ||
        productsStore.tagsRequests.remove.find((tag) => tag.tag === id && tag.product === props.productId) ||
        props.modelValue.find((tag) => tag === id);
    !findTag && productsStore.tagsRequests.create.push({ tag: id, product: props.productId });
};
</script>

<style scoped></style>
