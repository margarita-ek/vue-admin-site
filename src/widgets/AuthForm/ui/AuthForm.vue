<template>
    <div :class="s.authForm">
        <h1 :class="s.authTitle">Авторизация</h1>
        <form-input v-model="authenticationStore.authData.username" label="Имя пользователя" :placeholder="'Введите логин'" :type="'text'" @keydown.enter="sendUserData"/>
        <div :class="s.inputPasswordContainer">
            <form-input v-model="authenticationStore.authData.password" label="Пароль" :placeholder="'Введите пароль'" :type="typeInput" @keydown.enter="sendUserData"/>
            <font-awesome-icon v-if="typeInput === 'password'" icon="fa-eye" :class="s.eye" @click="typeInput = 'text'" />
            <font-awesome-icon v-else icon="fa-eye-slash" :class="s.eye" @click="typeInput = 'password'" />
        </div>
        <button :class="s.authBtn" :disabled="disabledBtn" @click="sendUserData">Войти</button>
        <p v-if="errorMessage && !authenticationStore.authData.username.length && !authenticationStore.authData.password.length" :class="s.authError">{{ useAuthValidation(errorMessage) }}</p>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { FormInput } from '@/shared/ui/inputs/FormInput';
import { useAuthenticationStore } from '@/shared/models/authentication/useAuthenticationStore';
import { useAuthValidation } from '@/widgets/AuthForm/models/useAuthValidation';
import s from './style.module.scss';

const authenticationStore = useAuthenticationStore();
const errorMessage = computed(() => authenticationStore.errorMessage);
const typeInput = ref<"text" | "password">('password');
const disabledBtn = ref(true);
watch(authenticationStore.authData, () => {
    (!authenticationStore.authData.username?.length) || 
    (!authenticationStore.authData.password?.length) ? 
    disabledBtn.value = true : disabledBtn.value = false;
});
const sendUserData = () => disabledBtn.value ? () => {} : authenticationStore.authLogin();
</script>

<style scoped></style>
