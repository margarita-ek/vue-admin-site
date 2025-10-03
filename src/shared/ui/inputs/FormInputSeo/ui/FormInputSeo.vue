<template>
    <div :class="s.formGroup">
        <label :class="s.formLabel">{{ label }}</label>
        <input v-model="inputValue" :class="s.formInput" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import s from '../../style.module.scss';

type Props = {
    modelValue: string | null;
    label: string;
    defaults: string;
};

type Emits = {
    (e: 'update:modelValue', v: string | null): void;
};

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const inputValue = ref<string>(props.modelValue ? props.modelValue : props.defaults);

watch(
    () => inputValue.value,
    (v) => {
        if (v === props.defaults || v === '') {
            emits('update:modelValue', null);
        } else {
            emits('update:modelValue', v);
        }
    },
);
</script>

<style scoped></style>
