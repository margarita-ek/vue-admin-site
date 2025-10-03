<template>
    <div :key="article.id" :class="s.tableRow">
        <div :class="[s.cell, s.cellStart]">
            <div class="item-id" :title="article.id.toString()" @click="copyToClipboard(article.id)">{{ article.id }}
            </div>
        </div>
        <div :class="[s.cell, s.cellWithImg]" @click="showModalWindow">
            <picture>
                <source v-for="(image, idx) in article.image.preview" :key="idx"
                    :type="`image/${Object.keys(article.image.preview).find(k => article.image.preview[k as 'webp' | 'jpg'] === image)}`"
                    :srcset="image">
                <img :alt="article.title">
            </picture>
        </div>
        <div :class="[s.cell, s.cellStart, s.cellWithDescContainer]">
            <div :class="s.cellWithDesc" @click.stop="router.push({ path: `articles/${article.id}`, params: { id: article.id } })">
                <div :class="s.title">{{ article.title }}</div>
                <a :class="s.slug" :href="`${url}${article.slug}`" target="_blanc" @click.stop>
                    {{ article.slug }}
                </a>
            </div>
            <div :class="s.cellWithSubDesc" @click.stop="router.push({ path: `portfolio/${article.id}`, params: { id: article.id } })">
                <div :class="s.year">{{ article.year }}</div>
                <div>{{ division ? division : "Нет данных" }}</div>
            </div>
            <div :class="s.cellWithFilter">
                <div :class="s.checkboxContainer">
                    <input :id="id.toString()" :class="s.filterOptionInputCheckbox" type="checkbox" v-model="selected"/>
                    <label :for="id.toString()" :class="s.filterOptionTitleCheckbox">Опубликовать</label>
                </div>
                <div>
                    <input class="dateInput" type="date" lang="ru" min="1900-01-01" max="2100-01-01" pattern="\d{2}-\d{2}-\d{4}" v-model="dateOfUpdated" @keydown.enter="handleEnterKey"/>
                </div>                
            </div>
        </div>
    </div>
    <modal-window v-if="showModal" @close="closeModalWindow">
        <picture>
            <source v-for="(image, idx) in article.image.full" :key="idx"
                :type="`image/${Object.keys(article.image.full).find(k => article.image.full[k as 'webp' | 'jpg'] === image)}`"
                :srcset="image">
            <img :alt="article.title">
        </picture>
    </modal-window>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useArticlesStore } from '@/shared/models/articles/useArticlesStore';
import { useRouter } from 'vue-router';
import { TArticle } from '@/shared/models/articles/types';
import { ModalWindow } from '@/widgets/ModalWindow';
import { copyToClipboard } from '@/entities/ProductRow/lib';
import { formatDateToSec } from '@/shared/utils/dateUtils';
import { debounce } from '@/shared/utils/debounceUtils';
import s from './style.module.scss';

type Props = {
    article: TArticle;
    division: string;
    id: string | number;
    is_visible: boolean;
    updated_at: string;
};

const { article, division, id, is_visible, updated_at } = defineProps<Props>();
const router = useRouter();
const url = 'https://k-gorod.ru/media/';
const articleStore = useArticlesStore();
const showModal = ref<boolean>(false);
const selected = ref(is_visible);
const dateOfUpdated = ref<string | number>(updated_at);
const checkDate = ref<string | number>("");

const showModalWindow = () => {
    document.body.classList.add('scrollHidden');
    showModal.value = true;
};

const closeModalWindow = () => {
    document.body.classList.remove('scrollHidden');
    showModal.value = false;
};

const handleEnterKey = (event: any) => {
    if (event.key === 'Enter') {
        articleStore.updateRow(article, +selected.value, +formatDateToSec(dateOfUpdated.value));
        checkDate.value = dateOfUpdated.value;    
    };
};

watch([dateOfUpdated], debounce(async () => {
    if (dateOfUpdated.value !== checkDate.value) { 
        articleStore.updateRow(article, +selected.value, +formatDateToSec(dateOfUpdated.value)); 
    } 
}, 1500), { deep: true });

watch(selected, (newValue) =>{
    articleStore.updateRow(article, +newValue, +formatDateToSec(dateOfUpdated.value));
}, { deep: true });
</script>
