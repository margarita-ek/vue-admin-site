<template>
    <div class="wrapper">
        <div v-if="!galleryToReplaceUploadedImg[obj.file_id]">
            <image-block :src="obj.preview" :alt="obj.alt" :removeImg="removeImg" :replaceImg="replaceImg"/>      
        </div> 
        <div v-else>
            <image-block :src="galleryToReplaceUploadedImg[obj.file_id].url" :alt="obj.alt" :removeImg="removeImg" :replaceImg="replaceImg"/>     
        </div>
        <div class="inputsContainer">
            <div class="positionContainer" v-if="galleryData![obj.file_id]">
                <form-input
                    v-model="galleryData![obj.file_id].pos" 
                    :label="''"
                    :maxlength="2"
                    :cell="true"
                />
            </div>
        </div>        
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePortfolioStore } from '@/shared/models/portfolio/usePortfolioStore';
import { ImageBlock } from '@/shared/ui/ImageBlock';
import { FormInput } from '@/shared/ui/inputs/FormInput';
import { TGalleryDataObject } from '@/shared/models/portfolio/types';

const portfolioStore = usePortfolioStore();
const { galleryData } = storeToRefs(portfolioStore);

type Props = {
    galleryToReplaceUploadedImg: any;
    obj: TGalleryDataObject;
    replaceImage: (file_id: number) => void;
    removeImage: (file_id: number | string) => void;
};

const { obj, replaceImage, removeImage } = defineProps<Props>();

const removeImg = () => {
    removeImage(obj.file_id);
};

const replaceImg = () => {
    replaceImage(+obj.file_id);
};
</script>

<style scoped lang="scss">
.wrapper {
    position: relative;
}

.inputsContainer {
    display: grid;
    align-content: space-between;
}

.positionContainer{
    position: absolute;
    display: flex;
    align-items: center;
    bottom: 10px;
    left: 10px;
    z-index: 5;

    & > div > input {
        width: auto;
        padding: 7px 6px !important;
        border-radius: 5px;
        width: 36px !important;
        text-align: center;
    }

    & > p {
        margin-right: 10px;
    }
}

.input {
    input {
        padding: 7px 6px !important;
        border-radius: 5px;
        width: 36px !important;
        text-align: center;
    }
}

.blockWithHint {
    position: relative;
}
</style>