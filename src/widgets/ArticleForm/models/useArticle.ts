import { computed, ref } from 'vue';
import { deepClone, isEqual } from '@/shared/utils/objectUtils';
import { articlesAPI } from '@/shared/api/articlesAPI';
import { TArticleData } from '@/widgets/ArticleForm/models/types';

export function useArticle() {
    const loading = ref<boolean>(false);
    const articleData = ref<TArticleData>();
    const articleDataInitial = ref<TArticleData>();
    const disabledSaveBtn = computed(() => loading.value || isEqual(articleData.value, articleDataInitial.value));

    async function getOneArticle(articleId: number) {
        try {
            loading.value = true;
            const res = await articlesAPI.loadOneArticle(articleId);
            articleData.value = res.data.article;
            articleDataInitial.value = deepClone(res.data.article);
        } catch (e) {
            console.error(e);
        } finally {
            loading.value = false;
        }
    }

    async function updateArticle(articleId: number, body: TArticleData) {
        try {
            loading.value = true;
            await articlesAPI.updateArticle(articleId, body);
            await getOneArticle(articleId);
        } catch (e) {
            console.error(e);
        } finally {
            loading.value = false;
        }
    }

    return {
        loading,
        disabledSaveBtn,
        articleData,
        getOneArticle,
        updateArticle,
    };
}
