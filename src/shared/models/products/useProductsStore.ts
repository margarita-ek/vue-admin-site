import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { productsAPI } from '@/shared/api/productsAPI';
import { TProduct } from './types';
import { useRouter } from 'vue-router';
import { filterDuplicateObjectsById } from '@/shared/utils/filterDuplicateObjectsById';

type TTag = {
    tag: number;
    product: number;
    type?: string;
};

export type TUpdateTags = {
    remove: TTag[];
    create: TTag[];
};

export const useProductsStore = defineStore('products', () => {
    const loading = ref<boolean>(false);
    const productsList = ref<TProduct[]>([]);
    const productListFromModalForReplacement = ref<TProduct[]>([]);
    const changedProducts = ref<any>([]); //массив с измененными объектами
    const errorMessageForTagsForm = ref<string>("");

    const tagsRequests = ref<TUpdateTags>({
        remove: [],
        create: [],
    });
    const selectedChanged = ref<boolean>(false);
    const pageSize = ref<number>(50);
    const totalCount = ref<number>(0);

    const router = useRouter();
    const queryParams = computed(() => {
        const query = router.currentRoute.value.fullPath.split('?')[1];
        return query ? `?${query}` : '';
    });

    async function getProductsList(queryParams: string) {
        try {
            loading.value = true;
            const res = await productsAPI.loadProductsList(queryParams);
            if (res.data.success) {
                const data: { success: boolean; products: TProduct[] } = res.data;
                pageSize.value = res.data.pageSize;
                totalCount.value = res.data.total;
                productsList.value = data.products;
            }
        } catch (e) {
            console.error(e);
        } finally {
            loading.value = false;
        }
    };

    async function getSomeDataForTagEditor(arrayWithIds: number[]) {
        try {
            loading.value = true;
            const res = await productsAPI.loadProductsListByIds({
                id: arrayWithIds
            });
            if (res.data.success) {
                productListFromModalForReplacement.value = res.data.products;
                productsList.value = [...res.data.products, ...filterDuplicateObjectsById(productsList.value, res.data.products)];
                return { success: res.data.success };
            };
            if (!res.data.success) {
                errorMessageForTagsForm.value = res.data.errors.id;
                setTimeout(() => errorMessageForTagsForm.value = "", 10000);
                return { success: res.data.success };
            };
        } catch (e) {
            console.error(e);
        } finally {
            loading.value = false;
        }
    };

    async function getPartOfTheDataForProductsList(currentPage: number) {
        const query = `${queryParams.value ? `${queryParams.value}&` : "?"}per-page=${pageSize.value}&page=${currentPage}`
        try {
            loading.value = true;
            const res = await productsAPI.loadProductsList(query);
            if (res.data) {
                productsList.value = [...productsList.value, ...res.data.products];
                pageSize.value = res.data.pageSize;
                totalCount.value = res.data.total;
            }
        } catch (e) {
            console.error(e);
        } finally {
            loading.value = false;
        }
    }

    async function updateProductsTags() {
        try {
            loading.value = true;
            await productsAPI.updateProductTags(tagsRequests.value);
            location.reload();
            // if(res.data.success) {
                // let newProductsMap = res.data.products.reduce((map: any, product: any) => {
                //     map[product.id] = product;
                //     return map;
                // }, {});
                // productsList.value = productsList.value.map(product => 
                //     newProductsMap[product.id] ? newProductsMap[product.id] : product
                // );
                // tagsRequests.value = {
                //     remove: [],
                //     create: [],
                // };
            // };
        } catch (e) {
            console.error(e);
        } finally {
            loading.value = false;
        }
    }

    function $reset() {
        productsList.value = [];
        tagsRequests.value = {
            remove: [],
            create: [],
        };
    }

    watch(
        () => queryParams.value,
        async (v) => {
            await getProductsList(v);
        },
    );

    return {
        loading,
        pageSize,
        totalCount,
        productsList,
        tagsRequests,
        queryParams,
        selectedChanged,
        productListFromModalForReplacement,
        changedProducts,
        errorMessageForTagsForm,
        getSomeDataForTagEditor,
        getProductsList,
        getPartOfTheDataForProductsList,
        updateProductsTags,
        $reset,
    };
});
