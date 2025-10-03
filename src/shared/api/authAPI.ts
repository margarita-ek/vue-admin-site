import axios from 'axios';
import { URL_AUTH_LOGIN, URL_AUTH_LOGOUT, URL_AUTH_STATUS } from '@/shared/config';

export const authAPI = {
    async authLogin(body: string) {
        return await axios.post(URL_AUTH_LOGIN, body);
    },
    async authLogout() {
        return await axios.post(URL_AUTH_LOGOUT);
    },
    async authStatus() {
        return await axios.post(URL_AUTH_STATUS);
    },
};
