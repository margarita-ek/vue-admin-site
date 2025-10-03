<template>
    <div :class="s.pageWrapper">
        <div :class="s.header">
            <p :class="s.title">Проект <span>#{{ pageId }}</span></p>
            <button-save :disabled="false" @click.stop="saveProject">Сохранить</button-save>             
        </div>
        <portfolio-form />
    </div>
    <loader-element v-if="loading"/>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { usePortfolioStore } from '@/shared/models/portfolio/usePortfolioStore';
import { PortfolioForm } from '@/widgets/PortfolioForm';
import { LoaderElement } from '@/shared/ui/LoaderElement';
import { ButtonSave } from '@/shared/ui/ButtonSave';
import s from './style.module.scss';

const router = useRouter();
const portfolioStore = usePortfolioStore();
const { loading } = storeToRefs(portfolioStore);
const pageId = ref<string>(router.currentRoute.value.params.id.toString());

const saveProject = async () => { 
    await portfolioStore.updateUploadedImages();
    await portfolioStore.downloadBinaryFileWithData();
    await portfolioStore.updateProject();
    await portfolioStore.updateSeo();
    setTimeout(()=> window.location.reload(), 500);
};

onMounted(async () => { 
    await usePortfolioStore().getProject(pageId.value);
    await usePortfolioStore().getGalleriesById();
    await usePortfolioStore().getHints();
});
</script>