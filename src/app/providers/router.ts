import { createRouter, createWebHistory } from 'vue-router';
// import { resetStore } from '@/shared/utils/storeUtils';

export const routes = [
    {
        path: '/login',
        components: {
            auth: () => import('@/pages/AuthPage'),
        },
    },
    {
        path: '/',
        redirect: '/edit/product-tags',
    },          
    {
        path: '/edit',
        children: [
            // { path: 'products', component: () => import('@/pages/Products/ProductsList') },
            // { path: 'products/:id', component: () => import('@/pages/Products/EditorProducts') },
            { path: 'product-tags', component: () => import('@/pages/EditorTags') },
            // { path: 'categories', component: () => import('@/pages/Categories/CategoriesList') },
            // { path: 'categories/:id', component: () => import('@/pages/Categories/EditorCategories') },
            { path: 'articles', component: () => import('@/pages/Articles/ArticlesList') },
            { path: 'articles/:id', component: () => import('@/pages/Articles/EditorArticles') },
            { path: 'portfolio', component: () => import('@/pages/PortfolioPage/PortfolioList') },
            { path: 'portfolio/:id', component: () => import('@/pages/PortfolioPage/PortfolioProject') },              
        ],
        // beforeEnter: () => {
        //     resetStore();
        // },
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/NotFound')
    }  
];

export const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});
