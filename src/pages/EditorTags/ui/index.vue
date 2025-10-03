<template>
    <div :class="s.toolbar">
        <filters-bar-products v-if="tags && series && categories" :class="s.filters" :tags="tags" :series="series"
            :categories="categories" />
        <search-input :class="s.search" placeholder="Поиск..." />
        <div :class="s.btnContainer">
            <div :class="s.inputContainer" @click="() => selectedChanged = !selectedChanged">
                <font-awesome-icon v-if="selectedChanged" icon="fa-eye-slash" />
                <font-awesome-icon v-else icon="fa-eye" />
                <div :class="s.label">Несохраненные изменения</div>
            </div>
            <div>
                <button-save @click="showModalWindow">Замена по списку</button-save>
                <button-save @click="productsStore.updateProductsTags()">Сохранить</button-save>
            </div>
        </div>
    </div>
    <div :class="s.pageWrapper">
        <products-table v-if="tags && series" :tags="tags" :series="series" />
    </div>
    <modal-window v-if="showModal" @close="closeModalWindow" :modalToggleStyle="true">
        <products-replacing-tags-by-list :tags="tags" :series="series" @close="closeModalWindow" />
    </modal-window>
    <loader-element v-if="loading"/>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useProductsStore } from '@/shared/models/products/useProductsStore';
import { useDictionariesStore } from '@/shared/models/dictionaries/useDictionariesStore';
import { LoaderElement } from '@/shared/ui/LoaderElement';
import { ProductsTable } from '@/widgets/ProductsTagsTable';
import { FiltersBarProducts } from '@/widgets/FiltersBarProducts';
import { SearchInput } from '@/shared/ui/inputs/SearchInput/index';
import { ButtonSave } from '@/shared/ui/ButtonSave/index';
import { ModalWindow } from '@/widgets/ModalWindow';
import { ProductsReplacingTagsByList } from '@/widgets/ProductsReplacingTagsByList';
import s from './style.module.scss';

const productsStore = useProductsStore();
const dictionariesStore = useDictionariesStore();
const { tags, series, categories } = storeToRefs(dictionariesStore);
const { selectedChanged, loading } = storeToRefs(productsStore);

const showModal = ref<boolean>(false);

const showModalWindow = () => {
    document.body.classList.add('scrollHidden');
    showModal.value = true;
};
const closeModalWindow = () => {
    document.body.classList.remove('scrollHidden');
    showModal.value = false;
};

onMounted(async ()=>{
    await dictionariesStore.getDictionaries();
});
</script>
