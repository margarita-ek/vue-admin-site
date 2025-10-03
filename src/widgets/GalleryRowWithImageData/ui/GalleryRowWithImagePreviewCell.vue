<template>
    <div class="wrapper">
        <image-block :src="url" :alt="''" :removeImg="removeImg" :replaceImg="replaceImg"/>       
        <div class="positionContainer" v-if="gallery[idx]">
            <form-input
                v-model="gallery[idx].pos" 
                :label="''"
                :maxlength="2"
                :cell="true"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { usePortfolioStore } from '@/shared/models/portfolio/usePortfolioStore';
import { ImageBlock } from '@/shared/ui/ImageBlock';
import { FormInput } from '@/shared/ui/inputs/FormInput';

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

<style scoped lang="scss">
.wrapper {
    position: relative;
}

.inputsContainer {
    position: relative;
    display: grid;
    align-content: space-between;
}

.positionContainer{
    position: absolute;
    display: flex;
    align-items: center;
    width: 200px;
    bottom: 10px;
    left: 10px;
    z-index: 5;

    & > p {
        margin-right: 10px;
    }
}

.blockWithHint {
    position: relative;
}
</style>