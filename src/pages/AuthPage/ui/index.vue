<template>
  <div :class="s.authPage">
    <auth-form />
  </div>
</template>

<script lang="ts" setup>
import { AuthForm } from '@/widgets/AuthForm';
import s from './style.module.scss';
</script>

<style scoped></style>