<template>
    <div v-if="categoryData">
        <div :class="s.formBlock">
            <div
                :class="[s.formImage, isDragging ? s.dragOver : '']"
                :style="{ backgroundImage: 'url(' + categoryData.icon + ')' }"
                @dragover="handleDragOver"
                @drop="handleDrop"
            >
                <file-uploader :class="s.toggleImage" :elem-id="categoryData.id" :files="filesDrag"
                    >Заменить</file-uploader
                >
            </div>
        </div>
        <div :class="s.formBlock">
            <h4 :class="s.formBlockTitle">Основное</h4>
            <div :class="s.formControls">
                <form-input v-model="categoryData.name" label="Название" />
                <form-input v-model="categoryData.slug" label="Slug" />
                <form-input v-model="categoryData.pos" label="Позиция" />
            </div>
        </div>
        <div :class="s.formBlock">
            <parent-category-dropdown v-model="categoryData.parent_id" />
        </div>
        <div :class="s.formBlock">
            <h4 :class="s.formBlockTitle">SEO</h4>
            <div :class="s.formControls">
                <form-input-seo
                    v-model="categoryData.seo.title"
                    :defaults="categoryData.seoDefaults.title"
                    label="Title"
                />
                <form-input-seo v-model="categoryData.seo.h1" :defaults="categoryData.seoDefaults.h1" label="h1" />
                <form-input-seo
                    v-model="categoryData.seo.description"
                    :defaults="categoryData.seoDefaults.description"
                    label="Description"
                />
                <form-input-seo
                    v-model="categoryData.seo.keywords"
                    :defaults="categoryData.seoDefaults.keywords"
                    label="Keywords"
                />
            </div>
        </div>
        <div :class="s.bottomBtn">
            <button-back />
            <button-save :disabled="disabledSaveBtn" @click="updateCategory(categoryId, categoryData)">Сохранить</button-save>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FormInput } from '@/shared/ui/inputs/FormInput';
import { ButtonBack } from '@/shared/ui/ButtonBack';
import { ButtonSave } from '@/shared/ui/ButtonSave';
import { FormInputSeo } from '@/shared/ui/inputs/FormInputSeo';
import { FileUploader } from '@/widgets/FileUploader';
import { ParentCategoryDropdown } from '@/shared/ui/ParentCategoryDropdown';
import { useCategory } from '@/widgets/CategoryForm/models/useCategory';
import { TFilesDrag } from '@/widgets/CategoryForm/models/types';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import s from './style.module.scss';

const { disabledSaveBtn, categoryData, getOneCategory, updateCategory } = useCategory();
const route = useRoute();
const categoryId = Number(route.params.id);
const isDragging = ref(false);
const filesDrag = ref<TFilesDrag | null>(null);

const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    isDragging.value = true;
};

const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    isDragging.value = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
        filesDrag.value = { target: { files } };
    }
};

onMounted(() => getOneCategory(categoryId));
</script>

<style scoped></style>
