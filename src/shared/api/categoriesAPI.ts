import axios from 'axios';
import { URL_CATEGORIES_LIST, URL_CATEGORIES_UPDATE, URL_UPDATE_ICON } from '@/shared/config';
import { apiInstance } from '@/shared/api/base';
import { TCategoryData } from '@/widgets/CategoryForm/models/types';

export const categoriesAPI = {
    async loadCategoriesList() {
        return await axios.get(URL_CATEGORIES_LIST);
    },
    async loadOneCategory(id: number) {
        return await axios.get(URL_CATEGORIES_LIST + `/${id}`);
    },
    async updateCategory(id: number, body: TCategoryData) {
        return apiInstance.post(URL_CATEGORIES_UPDATE + `/${id}`, body);
    },
    async updateCategoryIcon(formData: FormData) {
        return await axios.post(URL_UPDATE_ICON, formData);
    },
};
