import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { portfolioAPI } from '@/shared/api/portfolioAPI';
import { TProject, TDivisions, TSeo, TSeoResult, TGalleryData } from './types';

export const usePortfolioStore = defineStore('portfolio', () => {
    const loading = ref<boolean>(false);
    const portfolio = ref<TProject[]>([]);
    const divisions = ref<TDivisions>({});
    const years = ref<number[]>([]);
    const hintsData = ref<any>();
    const project = ref<TProject>({
        title: '',
        address: '',        
        description: '',        
        created_at: '',
        division: '',
        gallery_id: '',
        id: '',
        image: [],
        image_id: '',
        is_visible: 0,
        slug: '',
        updated_at: '',
        year: '',
    });
    const unchangedProject = ref<any>(); //версия project до изменений
    const unchangedSeo = ref<any>(); //версия seo до изменений
    const unchangedGalleryData = ref<any>({}); //версия galleryData до изменений

    const seo = ref<TSeo>({
        h1: '',
        meta_description: '',
        meta_keywords: '',
        title: '',      
    });
    const seoResult = ref<TSeoResult>({
        commercial: '', 
        h1: '',
        meta_description: '',
        meta_keywords: '',
        title: '',
    });

    //========================================
    const galleryImages = ref<any>([]); //двоичные файлы не загруженных изображений
    const galleryToReplaceUploadedImg = ref<any>([]); //двоичные файлы для замены загруженных изображений
    const gallery = ref<any>({}); //предварительный просмотр gallery
    const galleryData = ref<TGalleryData>(); //тут галерея с title и alt
    //========================================

    const router = useRouter();
    const queryParams = computed(() => {
        const query = router.currentRoute.value.fullPath.split('?')[1];
        return query ? `?${query}` : '';
    });  

    async function getPortfolioList(queryParams: string = '') {
        try {
            loading.value = true;
            const res = await portfolioAPI.loadListOfProjects(queryParams);
            if(res.data.success) {
                const data: { projects: TProject[] } = res.data;
                portfolio.value = data.projects;
            }
        } catch (e) {
            console.error(e);
        } finally {
            loading.value = false;
        };
    };
    
    async function getProject(id: number | string) {
        try {
            loading.value = true;
            const res = await portfolioAPI.oneProject(id);
            if (res.data.success) {
                const data: { portfolio: TProject, seoResult: TSeoResult, seo: TSeo } = res.data;
                project.value = { ...project.value, ...data.portfolio };
                seoResult.value = { ...seoResult.value, ...data.seoResult };
                seo.value = { ...seo.value, ...data.seo };
                unchangedProject.value = data.portfolio;
                unchangedSeo.value = data.seo;
                return;
            }
        } catch (e) {
            console.error(e);
        } finally {
            loading.value = false;
        };
    };

    async function getGalleriesById() {
        try {
            loading.value = true;
            if(project.value.gallery_id){
                const res = await portfolioAPI.getGalleriesById(project.value.gallery_id);
                if (res.data.success && res.data.gallery.entries) {
                    res.data.gallery.entries.forEach((element: any) => {
                        const keyImgFull = Object.keys(element.file['full'])[0];
                        const keyImgPreview = Object.keys(element.file['preview'])[0];
                        galleryData.value = galleryData.value || {};
                        unchangedGalleryData.value = JSON.parse(JSON.stringify(galleryData.value));

                        galleryData.value![element.file_id] = {
                            file_id: element.file_id,
                            pos: element.pos,
                            alt: element.file.alt,
                            title: element.file.title, 
                            full: element.file.full[keyImgFull],
                            preview: element.file.preview[keyImgPreview],
                        };
                    });
                    return;
                };
            };
        } catch (e) {
            console.error(e);
        } finally {
            loading.value = false;
        };
    };

    async function getPortfolioDivisionsList() {
        try {
            loading.value = true;
            const res = await portfolioAPI.loadListOfDivisions();
            if(res.data) {
                const data: { success: boolean; divisions: any } = res.data;
                divisions.value = data.divisions;
            }
        } catch (e) {
            console.error(e);
        } finally {
            loading.value = false;
        };
    };

    async function getPortfolioYearsList() {
        try {
            loading.value = true;
            const res = await portfolioAPI.loadListOfYears();
            if(res.data.success) {
                const data: { years: any } = res.data;
                years.value = data.years;
            }
        } catch (e) {
            console.error(e);
        } finally {
            loading.value = false;
        };
    };

    async function getHints() {
        try {
            loading.value = true;
            const res = await portfolioAPI.getHints();
            if (res.data.success) {
                hintsData.value = res.data.hints;
            }
        } catch (e) {
            console.error(e);
        } finally {
            loading.value = false;
        };
    };  

    async function autosubstitutionSlug() {
        try {
            loading.value = true;
            const res = await portfolioAPI.autosubstitutionSlug(project.value.title);
            if (res.data.success) {
                project.value.slug = res.data.slug;
            }
        } catch (e) {
            console.error(e);
        } finally {
            loading.value = false;
        };
    };    

    async function createProject() {
        $reset();
        try {
            loading.value = true;
            const res = await portfolioAPI.createProject();
            if (res.data.success) {
                router.push({ path: `portfolio/${res.data.created.id}`, params: { id: res.data.created.id } });
            }   
        } catch (e) {
            console.error(e);
        } finally {
            loading.value = false;
        }        
    };

    async function createGallery() {
        try {
            loading.value = true;
            const res = await portfolioAPI.createGalleries();
            if (res.data.success) {
                project.value.gallery_id = res.data.created.id;
                if(project.value.gallery_id) {
                    await updateProject();
                }
            }   
        } catch (e) {
            console.error(e);
        } finally {
            loading.value = false;
        }        
    };

    async function removeItemFromGallery(itemId: number | string) {
        try {
            loading.value = true;
            const res = await portfolioAPI.removeImageFromGalleryById(project.value.gallery_id, itemId);
            if (res.data.success) {
                location.reload();
            }   
        } catch (e) {
            console.error(e);
        } finally {
            loading.value = false;
        }        
    };      

    async function updateProject() {
        type ProjectKeys = 'id' | 'is_visible' | 'year' | 'division' | 'title' | 'slug'| 'address'| 'image_id'| 'gallery_id'| 'description'| 'created_at'| 'updated_at'| 'image';
        const body = ref<any>({});
        for (const key in project.value) {
            if (Object.prototype.hasOwnProperty.call(project.value, key) && Object.prototype.hasOwnProperty.call(unchangedProject.value, key)) {
                const typedKey = key as ProjectKeys;
                if (project.value[typedKey] !== unchangedProject.value[typedKey]) {
                    body.value[typedKey] = project.value[typedKey];
                };
            };
        };
        try {
            loading.value = true;
            if(Object.keys(body.value).length) {
                const res = await portfolioAPI.updateProject(project.value.id, body.value);
                if(res.data.success) {
                    project.value = { ...project.value, ...res.data.updated };
                };
            };
        } catch (e) {
            console.error(e);
        } finally {
            loading.value = false;
        }        
    };

    async function updateRow(project: TProject, isVisible: number, updatedAt: number) {
        try {
            loading.value = true;
            if (project.is_visible !== isVisible) { 
                const res = await portfolioAPI.updateProject(project.id, {
                    is_visible: isVisible,
                });
                if (res.data.success) { 
                    project.is_visible = res.data.updated.is_visible;
                };                
            };
            if (project.updated_at !== updatedAt) { 
                const res = await portfolioAPI.updateProject(project.id, {
                    updated_at: updatedAt,
                });
                if (res.data.success) { 
                    project.updated_at = res.data.updated.updated_at;
                };
            };
        } catch (e) {
            console.error(e);
        } finally {
            loading.value = false;
        };        
    };

    async function updateSeo() {
        type SeoKeys = 'h1' | 'meta_description' | 'meta_keywords' | 'title';
        const body = ref<any>({});
        
        if(unchangedSeo.value !== null) {
            for (const key in seo.value) {
                if (Object.prototype.hasOwnProperty.call(seo.value, key) && Object.prototype.hasOwnProperty.call(unchangedSeo.value, key)) {
                    const typedKey = key as SeoKeys;
                    if (seo.value[typedKey] !== unchangedSeo.value[typedKey]) {
                        body.value[typedKey] = seo.value[typedKey];
                    };
                };
            };
        } else {
            for (const key in seo.value) {
                const typedKey = key as SeoKeys;
                if(seo.value[typedKey]?.length) {
                    body.value[typedKey] = seo.value[typedKey];
                };
            };
        };
        try {
            loading.value = true;
            if(Object.keys(body.value).length){
                const res = await portfolioAPI.updateProject(project.value.id, {
                    seo: body.value
                });
                if(res.data.success) {
                    seo.value = { ...seo.value, ...res.data.seo }
                };
            };
        } catch (e) {
            console.error(e);
        } finally {
            loading.value = false;
        }        
    };

    async function updateInfoAboutImage(imageInfo: { id?: number | string, title: string, alt: string }) {
        const imageId = imageInfo.id;
        try {
            loading.value = true;
            const res = await portfolioAPI.updateInfoAboutImage(imageInfo.id!, {
                title: imageInfo.title,
                alt: imageInfo.alt
            });
            if (res.data.success) {
                if(res.data.updated.id === project.value.image_id) {
                    project.value.image.title = res.data.updated.image.title;
                    project.value.image.alt = res.data.updated.image.alt;                    
                };
                for (const key in galleryData.value) {
                    if(galleryData.value[key].file_id === imageId) {
                        galleryData.value[key].file = res.data.updated.image;
                    };
                };
            };
        } catch (e) {
            console.error(e);
        } finally {
            loading.value = false;
        };        
    };

    async function downloadBinaryFileWithData() {
        try {
            loading.value = true;
            if (!project.value.gallery_id) {
                await createGallery();
            }

            if (!galleryData.value) {
                galleryData.value = {};
            }
    
            for (const key in gallery.value) {
                const res = await portfolioAPI.uploadFile({
                    file: gallery.value[key].file,
                    alt: gallery.value[key].alt,
                    title: gallery.value[key].title,
                });
    
                if (res.data.success) {
                    const id = res.data.file.id;
                    const keyImgFull = Object.keys(res.data.file.image['full'])[0];
                    const keyImgPreview = Object.keys(res.data.file.image['preview'])[0];
                    
                    galleryData.value[id] = {
                        file_id: id,
                        pos: gallery.value[key].pos,
                        alt: res.data.file.alt,
                        title: res.data.file.title,
                        full: res.data.file.image.full[keyImgFull],
                        preview: res.data.file.image.preview[keyImgPreview],
                    };
    
                    if (galleryData.value[id]) {
                        delete gallery.value[key];
                        galleryImages.value = [];
                        const updateRes = await portfolioAPI.updateGalleriesById(project.value.gallery_id, {
                            entries: [
                                {
                                    gallery_id: project.value.gallery_id,
                                    file_id: id,
                                    pos: galleryData.value[id].pos,
                                }
                            ]
                        });
    
                        if (updateRes.data.updated.entries[0].pos) {
                            galleryData.value[id].pos = updateRes.data.updated.entries[0].pos;
                        }
                    }
                }
            }
        } catch (e) {
            console.error(e);
        } finally {
            loading.value = false;
        }
    }

    async function updateUploadedImages() {
        try {
            loading.value = true;

            if (!galleryData.value) {
                galleryData.value = {};
            };

            for (const key in galleryData.value) {
                const element = galleryData.value[key];
                if(+element.pos !== +unchangedGalleryData?.value[key]?.pos){
                    await portfolioAPI.updateGalleriesById(project.value.gallery_id, {
                        entries: [
                            {
                                file_id: element.file_id,
                                pos: element.pos
                            }
                        ]
                    });
                };
                if(element.title !== unchangedGalleryData?.value[key]?.title){
                    await portfolioAPI.updateInfoAboutImage(element.file_id, {
                        title: element.title,
                        alt: element.alt
                    });
                };
            };

            if(!Array.isArray(galleryToReplaceUploadedImg.value)){
                for (const key in galleryToReplaceUploadedImg.value) {
                    const element = galleryToReplaceUploadedImg.value[key];
                    const formData = new FormData();
                    if (element?.file && element?.file_id) { 
                        formData.append('file', element.file);
                        formData.append('title', galleryData.value[key].title);
                        formData.append('alt', galleryData.value[key].alt);
                        await portfolioAPI.replaceFile(element.file_id, formData);
                    };
                }
            };
        } catch (e) {
            console.error(e);
        } finally {
            loading.value = false;
        }        
    };

    function $reset() {
        galleryData.value = {};
        project.value = {
            title: '',
            address: '',        
            description: '',        
            created_at: '',
            division: '',
            gallery_id: '',
            id: '',
            image: [],
            image_id: '',
            is_visible: 0,
            slug: '',
            updated_at: '',
            year: '',
        };
        seo.value = {
            h1: '',
            meta_description: '',
            meta_keywords: '',
            title: '',      
        };
    }    

    watch(
        () => queryParams.value,
        async (v) => {
            await getPortfolioList(v);
        },
    );    

    return {
        loading,
        portfolio,
        divisions,
        years,
        project,
        unchangedProject,
        unchangedSeo,
        galleryData,
        unchangedGalleryData,        
        gallery,
        seo,
        seoResult,
        galleryImages,
        galleryToReplaceUploadedImg,
        hintsData,
        removeItemFromGallery,
        autosubstitutionSlug,
        getHints,
        getPortfolioList,
        getProject,
        getGalleriesById,
        getPortfolioDivisionsList,
        getPortfolioYearsList,
        createProject,
        updateProject,
        updateRow,
        updateSeo,
        updateInfoAboutImage,
        downloadBinaryFileWithData,
        updateUploadedImages,
        $reset,
    };
});
