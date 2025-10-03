<template>
    <router-view name="auth" />
    <div v-if="loginUser" style="display: flex">
        <nav-bar />
        <div style="width: 100%">
            <header-block />
            <router-view />
        </div>
    </div>
    <modal-window v-if="showModal" @close="closeModalWindow">
        <div class="err-window">
            <p>Ошибка сервера</p>
            <p>{{status}}</p>
            <p>{{message}}</p>
        </div>
    </modal-window>
</template>

<script setup lang="ts">
import { onBeforeMount, computed, ref, watch} from 'vue';
import { RouterView } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useErrorStatusesStore } from '@/shared/models/errorStatuses/useErrorStatusesStore';
import { NavBar } from '@/widgets/NavBar';
import { ModalWindow } from '@/widgets/ModalWindow';
import { useDictionariesStore } from '@/shared/models/dictionaries/useDictionariesStore';
import { HeaderBlock } from '@/widgets/HeaderBlock';
import { useAuthenticationStore } from '@/shared/models/authentication/useAuthenticationStore';

const dictionariesStore = useDictionariesStore();
const authenticationStore = useAuthenticationStore();
const errorStatusesStore = useErrorStatusesStore();
const loginUser = computed(() => authenticationStore.authData.login);
const { status, message } = storeToRefs(errorStatusesStore);
const showModal = ref<boolean>(false);

const showModalWindow = () => {
    document.body.classList.add('scrollHidden');
    showModal.value = true;
};
const closeModalWindow = () => {
    document.body.classList.remove('scrollHidden');
    showModal.value = false;
    errorStatusesStore.clearErrorStatusInfo();
};

onBeforeMount(async () => {
    await authenticationStore.authStatus();
    await dictionariesStore.getDictionaries();
});

watch(status, ()=>{
    if(status.value.length) showModalWindow();
});
</script>

<style>
@import './index.css';
</style>
