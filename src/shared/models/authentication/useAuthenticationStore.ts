import { defineStore } from 'pinia';
import { authAPI } from '@/shared/api/authAPI';
import { reactive, ref } from 'vue';
import { TAuthData } from '@/shared/models/authentication/types';
import { useRouter } from 'vue-router';

export const useAuthenticationStore = defineStore('auth', () => {
    const router = useRouter();
    const loading = ref<boolean>(false);
    const errorMessage = ref<string>('');
    const authData = reactive<TAuthData>({
        username: '',
        password: '',
        fullName: '',
        login: false,
        errorMessage: '',
    });

    function saveRequestedPageInSession(requestedPage: string) {
        sessionStorage.setItem('requestedPage', requestedPage);
    };
    function getRequestedPageFromSession(): string | null {
        return sessionStorage.getItem('requestedPage');
    };
    function clearRequestedPageFromSession() {
        sessionStorage.removeItem('requestedPage');
    };

    async function authLogin() {
        try {
            loading.value = true;
            const res = await authAPI.authLogin(JSON.stringify(authData));
            if (res.data.success) {
                authData.password = '';
                authData.username = res.data.username;
                authData.fullName = res.data.fullName;
                authData.login = res.data.success;
                const requestedPage = getRequestedPageFromSession();
                if (requestedPage && requestedPage !== '/login') {
                    clearRequestedPageFromSession();
                    router.push(requestedPage);
                } else {
                    router.push('/');
                }
            } else {
                errorMessage.value = res.data.message;
                authData.password = '';
                authData.username = '';
            }
        } catch (e) {
            console.error(e);
        } finally {
            loading.value = false;
        }
    }

    async function authLogout() {
        try {
            const res = await authAPI.authLogout();
            if (res.data.success) {
                authData.username = '';
                router.push('/login');
            }
        } catch (e) {
            console.error(e);
        }
    }

    async function authStatus() {
        try {
            const res = await authAPI.authStatus();
            authData.login = res.data.loggedIn;
            authData.username = res.data.username;
            authData.fullName = res.data.fullName;
            if (res.data.loggedIn && router.currentRoute.value.path === '/login') {
                const requestedPage = getRequestedPageFromSession();
                if (requestedPage) {
                    clearRequestedPageFromSession();
                    router.push(requestedPage);
                } else {
                    router.push('/');
                }
            }
            if (!res.data.loggedIn) {
                saveRequestedPageInSession(router.currentRoute.value.path);
                router.push('/login');
            }
        } catch (e) {
            console.error(e);
        }
    }

    return {
        loading,
        errorMessage,
        authData,
        authLogin,
        authLogout,
        authStatus,
    };
});
