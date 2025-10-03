<template>
    <div :class="[s.navbar, navBarStore.isVisibleNavbar ? s.navbarHidden : '']">
        <div :class="s.navbarLogo">
            <img :class="s.logoImg" :src="logo" alt="Logo" />
            <span :class="[s.logoTitle, navBarStore.isVisibleNavbar ? s.logoTitleHidden : '']"
                >Красивый<br />город</span
            >
        </div>
        <ul :class="s.sectionList">
            <li v-for="section in structure" :key="section.id" @click="() => navBarStore.chooseSection(section)">
                <router-link
                    :to="section.link"
                    :class="[s.section, navBarStore.selectedSection.id === section.id ? s.selectedSection : '']"
                >
                    <div :class="s.sectionIcon">
                        <font-awesome-icon :icon="section.icon" />
                    </div>
                    <span :class="[s.sectionTitle, navBarStore.isVisibleNavbar ? s.sectionTitleHidden : '']">{{
                        section.name
                    }}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import logo from '@/shared/assets/images/kg-logo.png';
import { structure } from '@/widgets/NavBar/models/structure';
import { useNavBarStore } from '@/shared/models/navbar/useNavBarStore';
import s from './style.module.scss';

const navBarStore = useNavBarStore();
</script>

<style scoped></style>
