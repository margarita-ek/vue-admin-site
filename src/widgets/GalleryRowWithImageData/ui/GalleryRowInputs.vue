<template>
    <div :class="s.inputsContainer">
        <div :class="s.positionContainer" v-if="gallery[idx]">
            <div :class="s.label">Приоритет<span :class="s.clue" @mouseover="showHint('hint1')" @mouseleave="hideHint('hint1')">?</span></div>
            <form-input
                v-model="gallery[idx].pos" 
                :label="''"
                :maxlength="2"
            />
            <hint-block v-if="hints.hint1" :title="hintsData.image.pos" />
        </div>
        <div v-if="gallery[idx]" :class="s.blockWithHint">
            <form-input-with-child v-model="gallery[idx].title" :label="'Title'">
                <span :class="s.clue" @mouseover="showHint('hint2')" @mouseleave="hideHint('hint2')">?</span>
            </form-input-with-child>
            <hint-block v-if="hints.hint2" :title="hintsData.image.title" />
        </div>
        <div v-if="gallery[idx]" :class="s.blockWithHint">
            <form-input-with-child v-model="gallery[idx].alt" :label="'Alt'">
                <span :class="s.clue" @mouseover="showHint('hint3')" @mouseleave="hideHint('hint3')">?</span>
            </form-input-with-child>
            <hint-block v-if="hints.hint3" :title="hintsData.image.alt" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePortfolioStore } from '@/shared/models/portfolio/usePortfolioStore';
import { storeToRefs } from 'pinia';
import { FormInputWithChild } from '@/shared/ui/inputs/FormInputWithChild';
import { FormInput } from '@/shared/ui/inputs/FormInput';
import { HintBlock } from '@/shared/ui/HintBlock';
import s from './styles.module.scss';

const portfolioStore = usePortfolioStore();
const { gallery, hintsData } = storeToRefs(portfolioStore);

type Props = {
    idx: number;
};

const { idx } = defineProps<Props>();

const hints = ref<any>({
    hint1: false,
    hint2: false,
    hint3: false,
});

function showHint(hintKey: string) {
    hints.value[hintKey] = true;
};

function hideHint(hintKey: string) {
    hints.value[hintKey] = false;
};
</script>