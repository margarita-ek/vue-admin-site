<template>
    <div :class="s.formGroup">
        <div>
            <label :class="s.formLabel">{{ label }}</label>
            <slot />
        </div>
        <input v-model="inputValue" :value="modelValue" :class="s.formInput" :maxlength="maxlength"
            :placeholder="`${placeholder?.length ? placeholder : ''}`" :type="type" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import s from '../../style.module.scss';

type Props = {
    modelValue: string | number | null | undefined;
    label: string;
    placeholder?: string;
    type?: string;
    maxlength?: number;
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