<template>
    <div>
        <div :class="s.formContainer">
            <form-input-with-child :class="project?.title && project?.title !== unchangedProject?.title ? s.edited : ''"
                v-model="project.title" :label="'Название'"><span :class="s.clue">*</span></form-input-with-child>
            <div>
                <div :class="s.filtersContainer">
                    <div :class="s.filters">
                        <div
                            :class="[unchangedProject?.updated_at && unchangedProject?.updated_at !== dateOfUpdatedToSec ? s.edited : '']">
                            <div :class="s.blockWithHint">
                                <div :class="s.menuTitleDate">Дата публикации:<span :class="s.clue" @mouseover="showHint('hint5')" @mouseleave="hideHint('hint5')">?</span></div>
                                <input class="dateInput" ref="calendar" type="date" lang="ru" min="1900-01-01"
                                    max="2100-01-01" pattern="\d{2}-\d{2}-\d{4}" v-model="dateOfUpdated" />
                                <hint-block v-if="hints.hint5" :title="hintsData.published_at" />
                            </div>
                        </div>
                        <div :class="s.rubricBlock">
                            <div :class="s.menuTitle">Рубрика:<span :class="s.clue">*</span></div>
                            <filter-portfolio v-if="divisionsSelected" label="Рубрика" query="division"
                                :filters="divisions" :initialValue="divisionsSelected"
                                :class="[unchangedProject?.division && unchangedProject?.division != project?.division ? s.edited : '']" />
                            <filter-portfolio v-else label="Рубрика" query="division" :filters="divisions"
                                :class="[unchangedProject?.division && unchangedProject?.division != project?.division ? s.edited : '']" />
                        </div>
                    </div>
                    <div :class="s.publish">
                        <input id="checkboxProject" :class="s.filterOptionInputCheckbox" type="checkbox"
                            v-model="selected" />
                        <label for="checkboxProject" :class="s.filterOptionTitleCheckbox">Опубликовать</label>
                    </div>
                </div>
            </div>
            <div :class="s.descBlock">
                <form-input-with-child
                    :class="project?.address && project?.address !== unchangedProject?.address ? s.edited : ''"
                    v-model="project.address" :label="'Адрес'"><span :class="s.clue">*</span></form-input-with-child>
                <text-area class="textarea label"
                    :class="project?.description && project?.description !== unchangedProject?.description ? s.edited : ''"
                    v-model="project.description" :label="'Описание'"><span :class="s.clue">*</span></text-area>
            </div>
            <div :class="s.seoBlock">
                <div :class="s.blockWithHint">
                    <form-input-with-child :class="seo?.h1 && seo?.h1 !== unchangedSeo?.h1 ? s.edited : ''"
                        v-model="seo.h1" :label="'H1'">
                        <span :class="s.clue" @mouseover="showHint('hint1')" @mouseleave="hideHint('hint1')">?</span>
                    </form-input-with-child>
                    <hint-block v-if="hints.hint1" :title="hintsData.seo.h1" />
                </div>
                <div :class="s.slugBlock">
                    <form-input-with-child
                        :class="project?.slug && project?.slug !== unchangedProject?.slug ? s.edited : ''"
                        v-model="project.slug" :label="'Slug'">
                        <span :class="s.clue" @mouseover="showHint('hint3')" @mouseleave="hideHint('hint3')">*&nbsp;?</span>
                    </form-input-with-child>
                    <hint-block v-if="hints.hint3" :title="hintsData.slug" />
                    <div :class="s.autoClue" @click="() => portfolioStore.autosubstitutionSlug()">Автоподстановка</div>
                </div>
                <div :class="s.blockWithHint">
                    <form-input-with-child :class="seo?.title && seo?.title !== unchangedSeo?.title ? s.edited : ''"
                        v-model="seo.title" :label="'Title'">
                        <span :class="s.clue" @mouseover="showHint('hint2')" @mouseleave="hideHint('hint2')">?</span>
                    </form-input-with-child>
                    <hint-block v-if="hints.hint2" :title="hintsData.seo.title" />
                </div>
                <div :class="s.blockWithHint">
                    <form-input-with-child
                        :class="seo?.meta_keywords && seo?.meta_keywords !== unchangedSeo?.meta_keywords ? s.edited : ''"
                        v-model="seo.meta_keywords" :label="'Keywords'" />
                </div>
                <div class="textareaBlockWithHint">
                    <text-area class="textarea"
                        :class="seo?.meta_description && seo?.meta_description !== unchangedSeo?.meta_description ? s.edited : ''"
                        v-model="seo.meta_description" :label="'Description'">
                        <span :class="s.clue" @mouseover="showHint('hint4')" @mouseleave="hideHint('hint4')">?</span>
                    </text-area>
                    <hint-block v-if="hints.hint4" :title="hintsData.seo.description" />
                </div>
            </div>
            <div :class="s.galleryContainer">
                <div :class="s.displayContainer">
                    <div v-if="!displayingComponents" :class="s.icon" @click.stop="() => displayingComponents = true"
                    title="Ячейки">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="4" width="6" height="6" rx="2" fill="#2D2D2D" />
                            <rect x="14" y="4" width="6" height="6" rx="2" fill="#2D2D2D" />
                            <rect x="14" y="15" width="6" height="6" rx="2" fill="#2D2D2D" />
                            <rect x="3" y="15" width="6" height="6" rx="2" fill="#2D2D2D" />
                        </svg>
                    </div>
                    <div v-if="displayingComponents" :class="s.icon" @click.stop="() => displayingComponents = false"
                        title="Список">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="5" width="5" height="2" rx="0.5" fill="#2D2D2D" />
                            <rect x="10" y="5" width="11" height="2" rx="0.5" fill="#2D2D2D" />
                            <rect x="10" y="11" width="11" height="2" rx="0.5" fill="#2D2D2D" />
                            <rect x="10" y="17" width="11" height="2" rx="0.5" fill="#2D2D2D" />
                            <rect x="3" y="11" width="5" height="2" rx="0.5" fill="#2D2D2D" />
                            <rect x="3" y="17" width="5" height="2" rx="0.5" fill="#2D2D2D" />
                        </svg>
                    </div>
                </div>

                <div v-if="galleryData && sortedGalleryData.length && !displayingComponents" :class="s.imagesBlock">
                    <gallery-row-with-uploaded-image-data v-for="obj in sortedGalleryData"
                        :galleryToReplaceUploadedImg="galleryToReplaceUploadedImg" :key="obj.file_id"
                        :replaceImage="replaceImageInUploadedGallery"
                        :removeImage="removeImageInUploadedGallery"
                        :obj="obj" />
                </div>
                <div v-if="galleryImages?.length && !displayingComponents" :class="s.imagesBlock">
                    <gallery-row-with-image-data v-for="(obj, idx) in galleryImages" :key="idx" :file="obj.file"
                        :url="obj.url" :idx="idx" 
                        :replaceImage="replaceImageInGallery"
                        :removeImage="removeImageInGallery"
                        />
                </div>

                <div v-if="galleryImages?.length && displayingComponents" :class="s.imagesBlockCell">
                    <gallery-row-with-image-preview-cell v-for="(obj, idx) in galleryImages" :key="idx" :file="obj.file"
                    :url="obj.url" :idx="idx" 
                    :replaceImage="replaceImageInGallery" 
                    :removeImage="removeImageInGallery"
                    />
                </div>
                <div v-if="galleryData && sortedGalleryData.length && displayingComponents" :class="s.imagesBlockCell">
                    <gallery-row-with-image-uploaded-cell v-for="obj in sortedGalleryData"
                        :galleryToReplaceUploadedImg="galleryToReplaceUploadedImg" :key="obj.file_id"
                        :replaceImage="replaceImageInUploadedGallery"
                        :removeImage="removeImageInUploadedGallery"
                        :obj="obj" 
                        />
                </div>

                <div :class="s.imagesBlock">
                    <gallery-image-uploader @getImages="getImages" ref="galleryImageUploaderRef" />
                    <gallery-image-uploader class="hidden" @getImages="getImagesForUploadedItem"
                        ref="galleryImageUploaderForReplaceRef" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { usePortfolioStore } from '@/shared/models/portfolio/usePortfolioStore';
import { TextArea } from '@/shared/ui/TextArea';
import { FormInputWithChild } from '@/shared/ui/inputs/FormInputWithChild';
import { HintBlock } from '@/shared/ui/HintBlock';
import { formatDateToSec, formatDateFromSecToCalendar } from '@/shared/utils/dateUtils';
import { GalleryRowWithImagePreviewCell } from '@/widgets/GalleryRowWithImageData';
import { GalleryRowWithImageUploadedCell } from '@/widgets/GalleryRowWithImageData';
import { FilterPortfolio } from '@/features/filters/portfolio/FilterPortfolio';
import { GalleryImageUploader } from '@/widgets/GalleryImageUploader';
import { GalleryRowWithImageData } from '@/widgets/GalleryRowWithImageData';
import { GalleryRowWithUploadedImageData } from '@/widgets/GalleryRowWithUploadedImageData';
import { useRouter } from 'vue-router';
import s from './styles.module.scss';
import { TGalleryDataObject } from '@/shared/models/portfolio/types';

const portfolioStore = usePortfolioStore();
const { hintsData, galleryImages, galleryToReplaceUploadedImg, unchangedProject, project, divisions, years, unchangedSeo, seo, galleryData } = storeToRefs(portfolioStore);

const selected = ref<boolean | number>(false);
const dateOfUpdated = ref<string | number>("");
const dateOfUpdatedToSec = ref<string | number>("");
const yearsSelected = ref<string | number>("");
const divisionsSelected = ref<string | number>("");
const galleryImageUploaderRef = ref<any>(null);
const galleryImageUploaderForReplaceRef = ref<any>(null);
const displayingComponents = ref<boolean>(false);
const sortedGalleryData = ref<TGalleryDataObject[]>([]);
const hints = ref<any>({
    hint1: false,
    hint2: false,
    hint3: false,
    hint4: false,
    hint5: false
});

const router = useRouter();
const queryParams = computed(() => {
    const query = router.currentRoute.value.fullPath.split('?')[1];
    return query ? `?${query}` : '';
});

function showHint(hintKey: string) {
    hints.value[hintKey] = true;
};

function hideHint(hintKey: string) {
    hints.value[hintKey] = false;
};

function replaceImageInGallery(idx: number) {
    if (galleryImageUploaderRef.value) {
        galleryImageUploaderRef.value.replaceImage(idx);
    };
};

function removeImageInGallery(idx: number) {
    if (galleryImageUploaderRef.value) {
        galleryImageUploaderRef.value.removeImage(idx);
    };
};

function replaceImageInUploadedGallery(idx: number) {
    if (galleryImageUploaderForReplaceRef.value) {
        galleryImageUploaderForReplaceRef.value.replaceImage(idx);
    };
};

function removeImageInUploadedGallery(itemId: number | string) {
    portfolioStore.removeItemFromGallery(itemId);
};

function getImages(value: any) {
    galleryImages.value = value;
};

function getImagesForUploadedItem(value: any) {
    galleryToReplaceUploadedImg.value = value;
};

function updateFromQueryParams() {
    const params = new URLSearchParams(queryParams.value);

    if (params.has('division')) {
        const divisionValue = params.get('division');
        if (divisionValue !== null) {
            project.value.division = +divisionValue;
            divisionsSelected.value = +divisionValue;
        };
    } else if (project.value.division && divisions.value) {
        divisionsSelected.value = divisions.value[project.value.division];
    };

    if (params.has('year')) {
        const yearValue = params.get('year');
        if (yearValue !== null) {
            project.value.year = +yearValue;
            yearsSelected.value = +yearValue;
        };
    } else if (project.value.year) {
        yearsSelected.value = project.value.year;
    };
};

watch(galleryData, () => {
    const data = galleryData.value || {};
    const entries = Object.entries(data);
    sortedGalleryData.value = entries.sort(([, a], [, b]) => a.pos - b.pos).map(([, value]) => value);
}, {deep: true});

watch(galleryToReplaceUploadedImg, () => {
    const objWithImages = ref<any>({});
    if (Array.isArray(galleryToReplaceUploadedImg.value)) {
        galleryToReplaceUploadedImg.value.forEach((element: any) => {
            objWithImages.value[element.file_id] = {
                file: element.file,
                file_id: element.file_id,
                url: element.url,
            };
        });
        galleryToReplaceUploadedImg.value = objWithImages.value;
    };
}, { deep: true });

watch(project, () => {
    if (project.value && project.value.is_visible) {
        selected.value = Boolean(project.value.is_visible);
    };
    if (project.value && project.value.updated_at) {
        dateOfUpdated.value = formatDateFromSecToCalendar(+project.value.updated_at);
    };
}, { deep: true });

watch(selected, () => {
    project.value.is_visible = Number(selected.value);
}, { deep: true });

watch(dateOfUpdated, () => {
    dateOfUpdatedToSec.value = formatDateToSec(dateOfUpdated.value);
}, { deep: true });

watch(dateOfUpdatedToSec, () => {
    project.value.updated_at = dateOfUpdatedToSec.value;
}, { deep: true });

watch(queryParams, () => {
    updateFromQueryParams();
}, { deep: true });

onMounted(async () => {
    await portfolioStore.getPortfolioDivisionsList();
    await portfolioStore.getPortfolioYearsList();
    updateFromQueryParams();
    if (years.value && project.value.year) {
        yearsSelected.value = project.value.year;
    };
    if (divisions.value && project.value.division) {
        divisionsSelected.value = divisions.value[project.value.division];
    };
});
</script>

<style scoped>
.textareaBlockWithHint {
    position: relative;
    display: grid;
    grid-column: span 2 !important;
}

.textarea {
    grid-column: span 2 !important;
    height: 90px !important;
}

.label {
    margin-top: 10px;
}

.hidden {
    visibility: hidden !important;
    position: absolute;
    left: 0;
}
</style>