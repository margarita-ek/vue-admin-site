<template>
    <div v-if="productData">
        <div :class="s.formBlock">
            <h4 :class="s.formBlockTitle">SEO</h4>
            <div :class="s.formControls">
                <form-input-seo
                    v-model="productData.seo.title"
                    :defaults="productData.seoDefaults.title"
                    label="Title"
                />
                <form-input-seo v-model="productData.seo.h1" :defaults="productData.seoDefaults.h1" label="h1" />
                <form-input-seo
                    v-model="productData.seo.meta_description"
                    :defaults="productData.seoDefaults.meta_description"
                    label="Description"
                />
                <form-input-seo
                    v-model="productData.seo.meta_keywords"
                    :defaults="productData.seoDefaults.meta_keywords"
                    label="Keywords"
                />
            </div>
        </div>
        <div :class="s.formBlock">
            <h4 :class="s.formBlockTitle">Дополнительно</h4>
            <div :class="s.formControls">
                <form-input v-model="productData.slug" label="Slug" />
            </div>
        </div>
        <div :class="s.bottomBtn">
            <button-back />
            <button-save :disabled="disabledSaveBtn" @click="updateProduct(productId, productData)">Сохранить</button-save>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FormInput } from '@/shared/ui/inputs/FormInput';
import { FormInputSeo } from '@/shared/ui/inputs/FormInputSeo';
import { ButtonBack } from '@/shared/ui/ButtonBack/index';
import { ButtonSave } from '@/shared/ui/ButtonSave';
import { useProduct } from '@/widgets/ProductForm/models/useProduct';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import s from './style.module.scss';

const { disabledSaveBtn, productData, getProduct, updateProduct } = useProduct();
const route = useRoute();
const productId = Number(route.params.id);

onMounted(() => getProduct(productId));
</script>

<style scoped></style>
