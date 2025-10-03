<template>
    <div @click="openFilePicker">
        <slot></slot>
        <input ref="fileInput" type="file" style="display: none" @change="handleFileChange" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { categoriesAPI } from '@/shared/api/categoriesAPI';
import { TFilesDrag } from '@/widgets/CategoryForm/models/types';

type Props = {
    elemId: number;
    files: TFilesDrag | null;
};

const props = defineProps<Props>();
const fileInput = ref<HTMLInputElement | null>(null);

const openFilePicker = () => {
    if (fileInput.value) fileInput.value.click();
};

const handleFileChange = async (event: Event | TFilesDrag) => {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
        const formData = new FormData();
        formData.append('id', props.elemId.toString());
        formData.append('image', file);
        await categoriesAPI.updateCategoryIcon(formData);
    }
};

watch(
    () => props.files,
    (v) => {
        if (v) handleFileChange(v);
    },
);
</script>

<style scoped></style>
