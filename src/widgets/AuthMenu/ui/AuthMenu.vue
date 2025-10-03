<template>
    <div :class="s.authMenu">
        <div :class="s.authInitials" @click.stop="toggleModal">{{ nameInitialsHelper(fullName) }}</div>
        <div v-if="isVisible" :class="s.authMenuModal" @click.stop>
            <ul :class="s.authModalList">
                <li :class="[s.authModalItem, s.authModalItemBold]">{{ userName }}</li>
                <li :class="s.authModalItem">{{ fullName }}</li>
                <li :class="[s.authModalItem, s.authModalItemExit]" @click="logout">Выйти</li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useAuthenticationStore } from '@/shared/models/authentication/useAuthenticationStore';
import { nameInitialsHelper } from '@/shared/utils/stringUtils';
import s from './style.module.scss';

const authenticationStore = useAuthenticationStore();
const userName = computed(() => authenticationStore.authData.username);
const fullName = computed(() => authenticationStore.authData.fullName);
const authLogout = computed(() => authenticationStore.authLogout);

const isVisible = ref<boolean>(false);
const toggleModal = () => (isVisible.value = !isVisible.value);
const logout = () => {
    isVisible.value = false;
    authLogout.value();
};
function clickHandler () {
    isVisible.value = false;
};
onMounted(() => {
    document.addEventListener('click', clickHandler);
});
onUnmounted(() => {
    document.removeEventListener('click', clickHandler);
});
</script>

<style scoped></style>
