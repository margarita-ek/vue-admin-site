<template>
    <div :class="s.inputWrapper">
        <input :class="s.file" type="file" name="myfile" ref="fileInputRef" :multiple="false"
        @change.stop="onFileSelect">
        <label :class="s.label" @click.stop="selectFiles">
            <font-awesome-icon icon="fa-plus-circle" />
        </label>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import s from './styles.module.scss';

const images = ref<any>([]);
const fileInputRef = ref<any>(null);
const selectedImageIndex = ref<null | number>(null);
const emits = defineEmits(['getImages']);

function selectFiles() {
    fileInputRef.value.click();
    return;
}

function onFileSelect(event: Event) {
    const files: any = (event.target as HTMLInputElement)?.files;
    if(files && files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
    if(files[i].type.split("/")[0] !== "image") continue;
    if(!images.value.some((e: any) => e.name === files[i].name)) {
        if(selectedImageIndex.value !== null) {
            images.value.splice(selectedImageIndex.value, 1, {
                file_id: selectedImageIndex.value,
                url: URL.createObjectURL(files[i]), 
                file: files[i],
            }
        );
            selectedImageIndex.value = null;
            emits('getImages', images.value);
            return;
        }
            images.value.push({ 
                file_id: selectedImageIndex.value,
                url: URL.createObjectURL(files[i]),
                file: files[i],                                         
            });
            emits('getImages', images.value);
        }
    }
    return;
}

function replaceImage(index: number) {
    selectedImageIndex.value = index;
    if(selectedImageIndex.value !== null) {
        selectFiles();
    }
};

function removeImage(index: number){
    images.value.splice(index, 1);
    return;
};

watch([images], () => {
    emits('getImages', images.value);
}, { deep: true });

defineExpose({
    replaceImage,
    removeImage
});
</script>

<style scoped>
</style>