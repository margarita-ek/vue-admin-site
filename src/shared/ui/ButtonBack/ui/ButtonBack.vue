<template>
    <button :class="s.buttonBack" @click="router.back()">
        <font-awesome-icon icon="fa-arrow-left" />
    </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import s from './style.module.scss';
const router = useRouter();
</script>

<style scoped></style>
