<template>
    <div :class="s.wrapper">
        <div :class="s.container">
            <div :class="s.title">
                Извините, страница не найдена
            </div>
            <div :class="s.notFound">
                404
            </div>
            <button class="btn" :class="s.btnNotFound" @click="handleClick">Вернуться на главную</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useNavBarStore } from '@/shared/models/navbar/useNavBarStore';
import { structure } from '@/widgets/NavBar/models/structure';
import { useRouter } from 'vue-router';
import s from './style.module.scss';
const navBarStore = useNavBarStore();
const router = useRouter();
const handleClick = () => {
    navBarStore.chooseSection(structure[0]);
    router.push("/");
};
</script>