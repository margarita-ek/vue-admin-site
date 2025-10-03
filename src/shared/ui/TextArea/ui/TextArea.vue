<template>
    <div :class="s.formGroup">
        <div>
            <label :class="s.formLabel">{{ label }}</label>
            <slot />
        </div>
        <textarea v-model="inputValue" :class="s.formTextarea"
            :placeholder="`${placeholder?.length ? placeholder : ''}`" :type="type"></textarea>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import s from './style.module.scss';

type Props = {
    modelValue: string | null;
    label: string;
    placeholder?: string;
    type?: string;
};

type Emits = {
    (e: 'update:modelValue', v: string): void;
};

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const inputValue = ref<string>('');

watch(
    () => props.modelValue,
    (v) => {
        if (v) inputValue.value = v.toString();
    },
    { immediate: true },
);

watch(
    () => inputValue.value,
    (v) => emits('update:modelValue', v),
);
</script>