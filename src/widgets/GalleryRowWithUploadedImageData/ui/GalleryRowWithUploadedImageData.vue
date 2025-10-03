<template>
    <div :class="s.wrapper">
        <div v-if="!galleryToReplaceUploadedImg[obj.file_id]">
            <image-block :src="obj.preview" :alt="obj.alt" :removeImg="removeImg" :replaceImg="replaceImg"/>      
        </div> 
        <div v-else>
            <image-block :src="galleryToReplaceUploadedImg[obj.file_id].url" :alt="obj.alt" :removeImg="removeImg" :replaceImg="replaceImg"/>     
        </div>
        <div :class="s.inputsContainer">
            <div :class="s.positionContainer" v-if="galleryData![obj.file_id]">
                <div :class="s.label">Приоритет<span :class="s.clue" @mouseover="showHint('hint1')" @mouseleave="hideHint('hint1')">?</span></div>
                <form-input
                    v-model="galleryData![obj.file_id].pos" 
                    :label="''"
                    :maxlength="2"
                />
                <hint-block v-if="hints.hint1" :title="hintsData.image.pos" />
            </div>
            <div v-if="galleryData![obj.file_id]" :class="s.blockWithHint">
                <form-input-with-child v-model="galleryData![obj.file_id].title" :label="'Title'">
                    <span :class="s.clue" @mouseover="showHint('hint2')" @mouseleave="hideHint('hint2')">?</span>
                </form-input-with-child>
                <hint-block v-if="hints.hint2" :title="hintsData.image.title" />
            </div>
            <div v-if="galleryData![obj.file_id]" :class="s.blockWithHint">
                <form-input-with-child v-model="galleryData![obj.file_id].alt" :label="'Alt'">
                    <span :class="s.clue" @mouseover="showHint('hint3')" @mouseleave="hideHint('hint3')">?</span>
                </form-input-with-child>
                <hint-block v-if="hints.hint3" :title="hintsData.image.alt" />
            </div>
        </div>        
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { usePortfolioStore } from '@/shared/models/portfolio/usePortfolioStore';
import { ImageBlock } from '@/shared/ui/ImageBlock';
import { FormInputWithChild } from '@/shared/ui/inputs/FormInputWithChild';
import { FormInput } from '@/shared/ui/inputs/FormInput';
import { HintBlock } from '@/shared/ui/HintBlock';
import { TGalleryDataObject } from '@/shared/models/portfolio/types';
import s from './styles.module.scss';

const portfolioStore = usePortfolioStore();
const { galleryData, hintsData } = storeToRefs(portfolioStore);

type Props = {
    galleryToReplaceUploadedImg: any;
    obj: TGalleryDataObject;
    replaceImage: (file_id: number) => void;
    removeImage: (file_id: number | string) => void;
};

const { obj, replaceImage, removeImage } = defineProps<Props>();


const hints = ref<any>({
    hint1: false,
    hint2: false,
    hint3: false,
});

const showHint = (hintKey: string) => {
    hints.value[hintKey] = true;
};

const hideHint = (hintKey: string) => {
    hints.value[hintKey] = false;
};

const removeImg = () => {
    removeImage(obj.file_id);
};

const replaceImg = () => {
    replaceImage(+obj.file_id);
};
</script>