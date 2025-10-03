import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useErrorStatusesStore = defineStore('statuses', () => {
    const status = ref<string>('');
    const message = ref<string>('');

    function getErrorStatusForModalWindow (statusValue: string, messageString: string) {
        status.value = statusValue;
        message.value = messageString;
        return;
    };

    function clearErrorStatusInfo () {
        status.value = '';
        message.value = '';
        return;
    };

    return {
        status,
        message,
        getErrorStatusForModalWindow,
        clearErrorStatusInfo,
    };
});