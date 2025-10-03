import { computed, ref } from 'vue';
import { categoriesAPI } from '@/shared/api/categoriesAPI';
import { TCategoryData } from '@/widgets/CategoryForm/models/types';
import { deepClone, isEqual } from '@/shared/utils/objectUtils';

export function useCategory() {
    const loading = ref<boolean>(false);
    const categoryData = ref<TCategoryData>();
    const categoryDataInitial = ref<TCategoryData>();
    const disabledSaveBtn = computed(() => loading.value || isEqual(categoryData.value, categoryDataInitial.value));

    async function getOneCategory(categoryId: number) {
        try {
            loading.value = true;
            const res = await categoriesAPI.loadOneCategory(categoryId);
            categoryData.value = res.data.category;
            categoryDataInitial.value = deepClone(res.data.category);
        } catch (e) {
            console.error(e);
        } finally {
            loading.value = false;
        }
    }

    async function updateCategory(categoryId: number, body: TCategoryData) {
        try {
            loading.value = true;
            await categoriesAPI.updateCategory(categoryId, body);
            await getOneCategory(categoryId);
        } catch (e) {
            console.error(e);
        } finally {
            loading.value = false;
        }
    }

    return {
        loading,
        disabledSaveBtn,
        categoryData,
        categoryDataInitial,
        getOneCategory,
        updateCategory,
    };
}
