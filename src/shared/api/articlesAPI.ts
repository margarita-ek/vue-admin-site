import { apiInstance } from '@/shared/api/base';
import { URL_ARTICLES_LIST, URL_ARTICLES_UPDATE, URL_ARCTICLES_DIVISIONS, URL_ARCTICLES_YEARS, URL_ARCTICLES_CREATE } from '@/shared/config';

export const articlesAPI = {
    async loadArticlesList(queryParams: string) {
        return apiInstance.get(URL_ARTICLES_LIST + queryParams);
    },
    async loadOneArticle(id: number) {
        return apiInstance.get(URL_ARTICLES_LIST + `/${id}`);
    },
    async updateArticle(id: number, body: any) {
        return apiInstance.post(URL_ARTICLES_UPDATE + `/${id}`, body);
    },
    async loadListOfDivisions() {
        return apiInstance.get(URL_ARCTICLES_DIVISIONS);
    },    
    async loadListOfYears() {
        return apiInstance.get(URL_ARCTICLES_YEARS);
    },
    async createArticle() {
        return apiInstance.get(URL_ARCTICLES_CREATE);
    },
};
