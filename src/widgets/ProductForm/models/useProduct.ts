import { computed, ref } from 'vue';
import { productsAPI } from '@/shared/api/productsAPI';
import { TProductData } from '@/widgets/ProductForm/models/types';
import { deepClone, isEqual } from '@/shared/utils/objectUtils';

export function useProduct() {
    const loading = ref<boolean>(false);
    const productData = ref<TProductData>();
    const productDataInitial = ref<TProductData>();
    const disabledSaveBtn = computed(() => loading.value || isEqual(productData.value, productDataInitial.value));
    async function getProduct(productId: number) {
        try {
            loading.value = true;
            const res = await productsAPI.oneProduct(productId);
            productData.value = res.data.product;
            productDataInitial.value = deepClone(res.data.product);
        } catch (e) {
            console.error(e);
        } finally {
            loading.value = false;
        }
    }

    async function updateProduct(productId: number, body: TProductData) {
        try {
            loading.value = true;
            await productsAPI.updateProduct(productId, body);
            await getProduct(productId);
        } catch (e) {
            console.error(e);
        } finally {
            loading.value = false;
        }
    }

    return {
        loading,
        disabledSaveBtn,
        productData,
        getProduct,
        updateProduct,
    };
}
