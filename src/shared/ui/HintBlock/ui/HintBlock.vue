<template>
    <p :class="s.hintContainer">
        {{ title }}
    </p>
</template>

<script setup lang="ts">
import s from './styles.module.scss';

type Props = {
    title: string;
};

const { title } = defineProps<Props>();
</script>