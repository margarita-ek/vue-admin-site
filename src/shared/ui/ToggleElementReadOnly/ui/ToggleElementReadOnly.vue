<template>
    <Switch
        v-model="enabled"
        :style="enabled ? 'background-color: rgb(210, 220, 81)' : 'background-color: rgb(229 231 235)'"
        :class="s.toggle"
        disabled
    >
        <span
            :style="enabled ? 'transform: translateX(1.5rem)' : 'transform: translateX(0.25rem)'"
            :class="[s.toggleElem]"
        />
    </Switch>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Switch } from '@headlessui/vue';
import s from './style.module.css';

type Props = {
    enabled: boolean;
};

const props = defineProps<Props>();
const enabled = ref<boolean>(props.enabled);
</script>

<style scoped></style>
