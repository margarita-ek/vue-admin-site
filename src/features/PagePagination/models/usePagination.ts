import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

export function usePagination() {
    const elementsPerPage = 8;
    const currentPage = ref<number>(1);
    const totalPages = 8;
    const router = useRouter();
    const currentQuery = { ...router.currentRoute.value.query };

    const prevPage = () => {
        currentPage.value--;
    };

    const nextPage = () => {
        currentPage.value++;
    };

    const goToPage = async (page: number) => {
        if (page >= 1 && page <= totalPages) {
            currentPage.value = page;
        }
    };

    watch(
        () => currentPage.value,
        async (v) => {
            currentQuery['page'] = String(v);
            await router.push({ query: currentQuery });
        },
    );

    onMounted(async () => {
        currentQuery['page'] = String(currentPage.value);
        currentQuery['per-page'] = String(elementsPerPage);
        for (const key in currentQuery) {
            if (currentQuery[key] === '') delete currentQuery[key];
        }
        await router.push({ query: currentQuery });
    });

    return {
        currentPage,
        totalPages,
        prevPage,
        nextPage,
        goToPage,
    };
}
