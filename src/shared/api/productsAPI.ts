import { apiInstance } from '@/shared/api/base';
import { URL_PRODUCT_UPDATE, URL_PRODUCTS_LIST, URL_TAGS_UPDATE } from '@/shared/config';
import { TUpdateTags } from '@/shared/models/products/useProductsStore';
import { TProductData } from '@/widgets/ProductForm/models/types';

export const productsAPI = {
    async loadProductsList(queryParams: string) {
        return apiInstance.get(URL_PRODUCTS_LIST + queryParams);
    },
    async loadProductsListByIds(body: any) {
        return apiInstance.post(URL_PRODUCTS_LIST, body);
    },
    async updateProductTags(body: TUpdateTags) {
        return apiInstance.post(URL_TAGS_UPDATE, body);
    },
    async oneProduct(id: number) {
        return apiInstance.get(URL_PRODUCTS_LIST + `/${id}`);
    },
    async updateProduct(id: number, body: TProductData) {
        return apiInstance.post(URL_PRODUCT_UPDATE + `/${id}`, body);
    },
};
