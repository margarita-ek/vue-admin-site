<template>
    <input :id="id" :class="s.filterOptionInputCheckbox" type="checkbox" v-model="selectedValue" />
    <label :for="id" :class="s.filterOptionTitleCheckbox">{{ label }}</label>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
import s from './styles.module.scss';
type Props = {
    id: string;
    label: string;
};

const selectedValue = ref<boolean>(false);
const emit = defineEmits(['selected']);
const { id, label } = defineProps<Props>();

watch(selectedValue, () => { 
    emit('selected', selectedValue.value);
});
</script>

<style scoped>
input {
    display: none;
}
</style>