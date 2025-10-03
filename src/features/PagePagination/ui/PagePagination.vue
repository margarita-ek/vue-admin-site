<template>
    <nav :class="s.pagination">
        <ul :class="s.paginationList">
            <li
                :class="[s.paginationBtn, currentPage === 1 || totalPages === 0 ? s.nonClickable : '']"
                @click="prevPage"
            >
                <span>&laquo;</span>
            </li>
            <li
                v-for="page in totalPages"
                :key="page"
                :class="[s.paginationBtn, page === currentPage ? s.activePage : '']"
                @click="goToPage(page)"
            >
                {{ page }}
            </li>
            <li
                :class="[s.paginationBtn, currentPage === totalPages || totalPages === 0 ? s.nonClickable : '']"
                @click="nextPage"
            >
                <span>&raquo;</span>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { usePagination } from '@/features/PagePagination/models/usePagination';
import s from './style.module.css';

const { totalPages, currentPage, prevPage, nextPage, goToPage } = usePagination();
</script>

<style scoped></style>
