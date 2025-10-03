<template>
    <div :class="s.wrapper">
        <div :class="s.imgContainer">
            <img :src="src" :alt="alt">
        </div>
        <div :class="s.toolbar">
            <div :class="s.iconContainer" @click.stop="removeImg">
                <font-awesome-icon :class="s.times" icon="fa-times" title="Удалить" />           
            </div>
            <div :class="s.iconContainer" @click.stop="replaceImg">
                <font-awesome-icon icon="fa-download" title="Заменить" />
            </div>
        </div>               
    </div>
</template>

<script setup lang="ts">
import s from './style.module.scss';

type Props = {
    src: string;
    alt: string;
    removeImg: () => void;
    replaceImg: () => void;
};

const { src, alt, removeImg, replaceImg } = defineProps<Props>();
</script>