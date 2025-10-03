<template>
    <div :class="s.wrapper">
        <image-block :src="url" :alt="''" :removeImg="removeImg" :replaceImg="replaceImg"/>       
        <gallery-row-inputs :idx="idx"/>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { usePortfolioStore } from '@/shared/models/portfolio/usePortfolioStore';
import { ImageBlock } from '@/shared/ui/ImageBlock';
import { GalleryRowInputs } from '@/widgets/GalleryRowWithImageData';
import s from './styles.module.scss';

const portfolioStore = usePortfolioStore();
const { gallery } = storeToRefs(portfolioStore);

type Props = {
    file?: any;
    url: string;
    idx: number;
    replaceImage: (idx: number) => void;
    removeImage: (idx: number) => void;
};

const { file, url, idx, replaceImage, removeImage } = defineProps<Props>();

const removeImg = () => {
    removeImage(idx);
};

const replaceImg = () => {
    replaceImage(idx);
};

onMounted(()=>{
    gallery.value[idx] = {
        pos: "",
        title: "",
        alt: "",
        file: file ? file : null,
    };
});
</script>