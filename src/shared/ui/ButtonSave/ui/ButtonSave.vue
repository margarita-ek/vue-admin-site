<template>
    <button :class="s.buttonSave">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
import s from './style.module.scss';
</script>

<style scoped></style>
