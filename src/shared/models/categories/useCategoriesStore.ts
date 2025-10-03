import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Category } from '@/shared/models/categories/types';
import { categoriesAPI } from '@/shared/api/categoriesAPI';

export const useCategoriesStore = defineStore('categories', () => {
    const loading = ref<boolean>(false);
    const categoriesData = ref<Category[]>([]);
    const categoriesList = ref<Category[]>([]);
    const openedCategories = ref<number[]>([1]);

    const toggleCategories = (id: number) => {
        const findCategory = openedCategories.value.find((categoryId) => categoryId === id);
        if (findCategory) {
            openedCategories.value = openedCategories.value.filter((categoryId) => categoryId !== id);
        } else {
            openedCategories.value.push(id);
        }
    };
    function sortCategories(categories: Category[]) {
        const categoryMap: { [key: number]: Category } = {};
        categoriesList.value = [];
        categories.forEach((category) => (categoryMap[category.id] = category));
        categories.forEach((category) => {
            if (category.parent === 0) {
                categoriesList.value.push(category);
            } else {
                const parentCategory = categoryMap[category.parent];
                if (parentCategory) {
                    if (!parentCategory.children) {
                        parentCategory.children = [];
                    }
                    parentCategory.children.push(category);
                }
            }
        });
    }
    async function getCategoriesList() {
        try {
            loading.value = true;
            const res = await categoriesAPI.loadCategoriesList();
            categoriesData.value = res.data.categories;
            sortCategories(res.data.categories);
        } catch (e) {
            console.error(e);
        } finally {
            loading.value = false;
        }
    }

    function $reset() {
        categoriesData.value = [];
        categoriesList.value = [];
        openedCategories.value = [1];
    }

    return {
        categoriesData,
        categoriesList,
        openedCategories,
        toggleCategories,
        getCategoriesList,
        $reset,
    };
});
