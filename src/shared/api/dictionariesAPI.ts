import { apiInstance } from '@/shared/api/base';
import { URL_DICTIONARIES } from '@/shared/config';

export const dictionariesAPI = {
    async loadDictionaries() {
        return apiInstance.get(URL_DICTIONARIES);
    },
};