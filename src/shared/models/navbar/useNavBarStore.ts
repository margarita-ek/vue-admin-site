import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';
import { addItemInLS, getItemFromLS } from '@/shared/utils/sessionStorageUtils';
import { TSection } from '@/shared/models/navbar/types';
import { structure } from '@/widgets/NavBar/models/structure';

export const useNavBarStore = defineStore('navbar', () => {
    const isVisibleNavbar = ref<boolean>(false);
    const selectedSection = ref<TSection>(structure[0]);

    const toggleNavbar = () => {
        isVisibleNavbar.value = !isVisibleNavbar.value;
        addItemInLS('isVisibleMenu', isVisibleNavbar.value);
    };
    const chooseSection = (section: TSection) => {
        selectedSection.value = section;
        addItemInLS('selectedSection', selectedSection.value);
    };

    onMounted(() => {
        const selectedSectionLS = getItemFromLS('selectedSection');
        if (selectedSectionLS) selectedSection.value = selectedSectionLS;
        isVisibleNavbar.value = getItemFromLS('isVisibleMenu') ?? false;
    });

    return {
        isVisibleNavbar,
        selectedSection,
        toggleNavbar,
        chooseSection,
    };
});
