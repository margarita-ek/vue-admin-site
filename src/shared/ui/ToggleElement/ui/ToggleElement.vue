<template>
    <Switch
        v-model="enabled"
        :style="enabled ? 'background-color: rgb(210, 220, 81)' : 'background-color: rgb(229 231 235)'"
        :class="s.toggle"
        :disabled="disabled"
    >
        <span
            :style="enabled ? 'transform: translateX(1.5rem)' : 'transform: translateX(0.25rem)'"
            :class="[s.toggleElem]"
        />
    </Switch>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Switch } from '@headlessui/vue';
import s from './style.module.css';

type Props = {
    modelValue: number;
    disabled?: boolean;
};

type Emits = {
    (e: 'update:modelValue', v: number): void;
};

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const enabled = ref<boolean>(!!props.modelValue);

watch(
    () => enabled.value,
    (v) => {
        emits('update:modelValue', v ? 1 : 0);
    },
);
</script>

<style scoped></style>
