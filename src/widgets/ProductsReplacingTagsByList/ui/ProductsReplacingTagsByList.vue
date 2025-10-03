<template>
    <div :class="s.formWrapper">
        <div>
            <p :class="s.title">Замена тегов</p>
            <text-area v-model="productList" :label="'Для продуктов с идентификаторами:'" />
            <p :class="s.message">{{errorMessageForTagsForm}}</p>
            <div :class="s.panelWithProductTags">
                <div :class="s.removeTag">
                    <p>Удалить теги:</p>
                    <div :class="s.filtersContainer">
                        <filter-products-tags-multiple v-if="seriesOptions.length > 0" label="Серия" query="series" :filters="seriesOptions" @tagsValue="getSeriesRemovedTags"/>
                        <filter-products-tags-multiple v-if="purposeTagsOptions.length > 0" label="Назначение" query="purpose"
                            :filters="purposeTagsOptions" @tagsValue="getPurposeRemovedTags"/>
                        <filter-products-tags-multiple v-if="materialTagsOptions.length > 0" label="Материал" query="material"
                            :filters="materialTagsOptions" @tagsValue="getMaterialRemovedTags"/>
                        <filter-products-tags-multiple v-if="scopeTagsOptions.length > 0" label="Направление" query="scope"
                            :filters="scopeTagsOptions" @tagsValue="getScopeRemovedTags"/>                    
                    </div>
                    <div :class="s.tagsContainer"><span v-for="(item, idx) in allRemovedTags" :class="s.tag" :key="idx">{{item.name}}</span></div>
                </div>
                <div :class="s.addTag">
                    <p>Добавить теги:</p>
                    <div :class="s.filtersContainer">
                        <filter-products-tags-multiple v-if="seriesOptions.length > 0" label="Серия" query="series" :filters="seriesOptions" @tagsValue="getSeriesAddedTags"/>
                        <filter-products-tags-multiple v-if="purposeTagsOptions.length > 0" label="Назначение" query="purpose"
                            :filters="purposeTagsOptions" @tagsValue="getPurposeAddedTags" />
                        <filter-products-tags-multiple v-if="materialTagsOptions.length > 0" label="Материал" query="material"
                            :filters="materialTagsOptions" @tagsValue="getMaterialAddedTags" />
                        <filter-products-tags-multiple v-if="scopeTagsOptions.length > 0" label="Направление" query="scope"
                            :filters="scopeTagsOptions" @tagsValue="getScopeAddedTags" />                    
                    </div>                
                    <div :class="s.tagsContainer"><span v-for="(item, idx) in allAddedTags" :class="s.tag" :key="idx">{{item.name}}</span></div>
                </div>
            </div>            
        </div>
        <div :class="s.btnContainer">
            <button-save @click="unassignTags()" :class="s.cancel">Отменить</button-save>
            <button-save @click="applyTagAssignment()">Применить</button-save>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useProductsStore } from '@/shared/models/products/useProductsStore';
import { TextArea } from '@/shared/ui/TextArea';
import { ButtonSave } from '@/shared/ui/ButtonSave/index';
import { FilterProductsTagsMultiple } from '@/features/filters/products/FilterProductsTagsMultiple';
import { stringToNumberArray } from '../lib/stringToNumberArray';
import { dataConversionForTagsRequests } from '../lib/dataConversionForTagsRequests';
import { TDictionariesData } from '@/shared/models/dictionaries/types';
import s from './style.module.scss';

type Props = {
    tags: TDictionariesData['tags'];
    series: TDictionariesData['series'];
};

type TSelectData = { id: number, name: string };

const props = defineProps<Props>();
const emit = defineEmits(['close']);
const productsStore = useProductsStore();
const { tagsRequests, selectedChanged, productListFromModalForReplacement, changedProducts, errorMessageForTagsForm } = storeToRefs(productsStore);

const productList = ref<string>("");
const productArrayWithId = ref<number[]>([]); //массив со всем id

const removeTagsForTagsRequest = ref<any>();
const createTagsForTagsRequest = ref<any>();

const allAddedTags = ref<TSelectData[]>([]);
const allRemovedTags = ref<TSelectData[]>([]);

const seriesAddedTags = ref<TSelectData[]>([]);
const purposeAddedTags = ref<TSelectData[]>([]);
const materialAddedTags = ref<TSelectData[]>([]);
const scopeAddedTags = ref<TSelectData[]>([]);

const seriesRemovedTags = ref<TSelectData[]>([]);
const purposeRemovedTags = ref<TSelectData[]>([]);
const materialRemovedTags = ref<TSelectData[]>([]);
const scopeRemovedTags = ref<TSelectData[]>([]);

const getSeriesAddedTags = (value:any) => seriesAddedTags.value = value;
const getPurposeAddedTags = (value:any) => purposeAddedTags.value = value;
const getMaterialAddedTags = (value:any) => materialAddedTags.value = value;
const getScopeAddedTags = (value:any) => scopeAddedTags.value = value;

const getSeriesRemovedTags = (value:any) => seriesRemovedTags.value = value;
const getPurposeRemovedTags = (value:any) => purposeRemovedTags.value = value;
const getMaterialRemovedTags = (value:any) => materialRemovedTags.value = value;
const getScopeRemovedTags = (value: any) => scopeRemovedTags.value = value;

const statusMessage = ref<boolean>(false);

const unassignTags = () => { 
    emit('close');
    tagsRequests.value.remove = [];
    tagsRequests.value.create = [];
}; 

const applyTagAssignment = async () => { 
    const { success } = await productsStore.getSomeDataForTagEditor(productArrayWithId.value) as any;
    statusMessage.value = success;
    success ? emit('close') : null;

    if(productListFromModalForReplacement.value){
        changedProducts.value = [...changedProducts.value, ...productListFromModalForReplacement.value];
    };
    selectedChanged.value = true;
};

const purposeTagsOptions = computed(() =>
    props.tags.reduce((acc: { id: number; name: string }[], curr: any) => {
        if (curr.type === 'purpose') acc.push({ id: curr.id, name: curr.label });
        return acc;
    }, []),
);
const materialTagsOptions = computed(() =>
    props.tags.reduce((acc: { id: number; name: string }[], curr: any) => {
        if (curr.type === 'material') acc.push({ id: curr.id, name: curr.label });
        return acc;
    }, []),
);
const scopeTagsOptions = computed(() =>
    props.tags.reduce((acc: { id: number; name: string }[], curr: any) => {
        if (curr.type === 'scope') acc.push({ id: curr.id, name: curr.label });
        return acc;
    }, []),
);
const seriesOptions = computed(() => props.series.map((series: any) => ({ id: series.id, name: series.name })));

watch([seriesRemovedTags, purposeRemovedTags, materialRemovedTags, scopeRemovedTags], ()=>{
    allRemovedTags.value = [...seriesRemovedTags.value, ...purposeRemovedTags.value, ...materialRemovedTags.value, ...scopeRemovedTags.value];
}, {deep: true});
watch([seriesAddedTags, purposeAddedTags, materialAddedTags, scopeAddedTags], ()=>{
    allAddedTags.value = [...seriesAddedTags.value, ...purposeAddedTags.value, ...materialAddedTags.value, ...scopeAddedTags.value];
}, {deep: true});
watch(productList, ()=>{
    productArrayWithId.value = stringToNumberArray(productList.value);
}, { deep: true });

watch([allRemovedTags, allAddedTags, productArrayWithId], () => {
    const { removeTags, createTags } = dataConversionForTagsRequests(allRemovedTags.value, allAddedTags.value, productArrayWithId.value);
    removeTagsForTagsRequest.value = removeTags;
    createTagsForTagsRequest.value = createTags;
}, { deep: true });

watch([removeTagsForTagsRequest], () => {
    tagsRequests.value.remove = removeTagsForTagsRequest.value;
}, { deep: true });

watch([createTagsForTagsRequest], () => {
    tagsRequests.value.create = createTagsForTagsRequest.value;
}, { deep: true });
</script>