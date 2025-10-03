<template>
    <div :class="s.wrapper" @click.stop="hideDialog">
        <div :class="[!modalToggleStyle ? s.wrapperContent : s.formWrapperContent]" @click.stop>
            <div :class="s.close"><font-awesome-icon icon="fa-close" :class="s.removeBtn" @click="hideDialog" /></div>
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import s from './styles.module.scss';
const emit = defineEmits(['close']);
const hideDialog = () => emit('close');
type Props = {
    modalToggleStyle?: boolean;
};

const { modalToggleStyle } = defineProps<Props>();
</script>