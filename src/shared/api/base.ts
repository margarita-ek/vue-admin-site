import axios from 'axios';
import { useRouter } from 'vue-router';
import { useErrorStatusesStore } from '@/shared/models/errorStatuses/useErrorStatusesStore';

const router = useRouter();

export const apiInstance = axios.create({
    baseURL: '',
});

apiInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status.toString().startsWith('5')) {
            useErrorStatusesStore().getErrorStatusForModalWindow(error.response.status.toString(), error.response.data.message);
        };
        if (error.response.status == 401) {
            router.push('/login');
        };
        return Promise.reject(error);
    }
);
