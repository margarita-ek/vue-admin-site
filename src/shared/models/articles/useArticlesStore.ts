import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { articlesAPI } from '@/shared/api/articlesAPI';
import { TArticle, TDivisions } from '@/shared/models/articles/types';
import { useRouter } from 'vue-router';

export const useArticlesStore = defineStore('articles', () => {
    const loading = ref<boolean>(false);
    const articlesList = ref<TArticle[]>([]);
    const divisions = ref<TDivisions>({});
    const years = ref<number[]>([]);    

    const router = useRouter();
    const queryParams = computed(() => {
        const query = router.currentRoute.value.fullPath.split('?')[1];
        return query ? `?${query}` : '';
    }); 

    async function getArticlesList(queryParams: string) {
        try {
            loading.value = true;
            const res = await articlesAPI.loadArticlesList(queryParams);
            articlesList.value = res.data.articles;
        } catch (e) {
            console.error(e);
        } finally {
            loading.value = false;
        };
    };

    async function createArticle() {
        $reset();
        try {
            loading.value = true;
            const res = await articlesAPI.createArticle();
            if (res.data.success) {
                router.push({ path: `articles/${res.data.created.id}`, params: { id: res.data.created.id } });
            }   
        } catch (e) {
            console.error(e);
        } finally {
            loading.value = false;
        }        
    };
    
    async function updateRow(article: TArticle, isVisible: number, updatedAt: number) {
        try {
            loading.value = true;
            if (article.is_visible !== isVisible) { 
                const res = await articlesAPI.updateArticle(article.id, {
                    is_visible: isVisible,
                });
                if (res.data.success) { 
                    article.is_visible = res.data.updated.is_visible;
                };                
            };
            if (article.updated_at !== updatedAt) { 
                const res = await articlesAPI.updateArticle(article.id, {
                    updated_at: updatedAt,
                });
                if (res.data.success) { 
                    article.updated_at = res.data.updated.updated_at;
                };
            };
        } catch (e) {
            console.error(e);
        } finally {
            loading.value = false;
        };        
    };        

    async function getArticlesDivisionsList() {
        try {
            loading.value = true;
            const res = await articlesAPI.loadListOfDivisions();
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
    
    async function getArticlesYearsList() {
        try {
            loading.value = true;
            const res = await articlesAPI.loadListOfYears();
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
    
    function $reset() {
        articlesList.value = [];
    };    

    watch(
        () => queryParams.value,
        async (v) => await getArticlesList(v),
    );

    return {
        loading,
        queryParams,
        articlesList,
        divisions,
        years,
        $reset,
        updateRow,
        createArticle,
        getArticlesList,
        getArticlesDivisionsList,
        getArticlesYearsList,
    };
});
