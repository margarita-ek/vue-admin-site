<template>
    <header :class="s.header">
        <div :class="s.toggleNavbar" @click="navBarStore.toggleNavbar">
            <font-awesome-icon icon="fa-bars" />
        </div>
        <h1 :class="s.headerTitle">{{ navBarStore.selectedSection.name }}</h1>
        <div :class="s.headerAuth">
            <auth-menu />
        </div>
    </header>
</template>

<script setup lang="ts">
import { AuthMenu } from '@/widgets/AuthMenu';
import { useNavBarStore } from '@/shared/models/navbar/useNavBarStore';
import s from './style.module.scss';

const navBarStore = useNavBarStore();
</script>

<style scoped></style>
