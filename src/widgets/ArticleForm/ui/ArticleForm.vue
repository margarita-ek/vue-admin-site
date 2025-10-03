<template>
    <div v-if="articleData">
        <div :class="s.formBlock">
            <div :class="s.formImage" :style="{ backgroundImage: 'url(' + articleData.img + ')' }"></div>
        </div>
        <div :class="s.formControls">
            <div :class="s.formBlock">
                <h4 :class="s.formBlockTitle">Дата публикации</h4>
                <div :class="s.formControls">
                    <VueDatePicker v-model="dataPublished" :enable-time-picker="false" />
                </div>
            </div>
            <div :class="s.formBlock">
                <h4 :class="s.formBlockTitle">Видимость</h4>
                <div :class="s.formControls">
                    <toggle-element v-model="articleData.is_visible" />
                </div>
            </div>
        </div>
        <div :class="s.formBlock">
            <h4 :class="s.formBlockTitle">Основное</h4>
            <div :class="s.formControls">
                <form-input v-model="articleData.division" label="Раздел" />
                <form-input v-model="articleData.title" label="Заголовок" />
                <form-input v-model="articleData.slug" label="Slug" />
                <form-input v-model="articleData.description" label="Описание" />
            </div>
        </div>
        <div :class="s.bottomBtn">
            <button-back />
            <button-save :disabled="disabledSaveBtn" @click="updateArticle(articleId, articleData)">Сохранить</button-save>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FormInput } from '@/shared/ui/inputs/FormInput/index';
import { onMounted, ref, watch } from 'vue';
import { useArticle } from '@/widgets/ArticleForm/models/useArticle';
import { useRoute } from 'vue-router';
import { ButtonBack } from '@/shared/ui/ButtonBack/index';
import { ButtonSave } from '@/shared/ui/ButtonSave/index';
import { ToggleElement } from '@/shared/ui/ToggleElement/index';
import s from './style.module.scss';

const { disabledSaveBtn, articleData, getOneArticle, updateArticle } = useArticle();
const route = useRoute();
const articleId = Number(route.params.id);
const dataPublished = ref<string | number>('');
onMounted(() => getOneArticle(articleId));

watch(
    () => articleData.value,
    (v) => {
        if (v) dataPublished.value = v.published_at * 1000;
    },
);

watch(
    () => dataPublished.value,
    (v) => {
        if (articleData.value) {
            const date = new Date(v);
            articleData.value.published_at = date.getTime() / 1000;
        }
    },
    { immediate: true },
);
</script>

<style scoped></style>
