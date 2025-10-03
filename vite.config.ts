import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), 'VITE_');
    const apiBaseUrl = env.VITE_VUE_APP_API_BASE_URL;

    return {
        plugins: [vue()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        server: {
            proxy: {
                '^/products': {
                    changeOrigin: true,
                    target: apiBaseUrl,
                    secure: false,
                },
                '^/portfolio': {
                    changeOrigin: true,
                    target: apiBaseUrl,
                    secure: false,
                },
                '^/galleries': {
                    changeOrigin: true,
                    target: apiBaseUrl,
                    secure: false,
                },
                '^/files': {
                    changeOrigin: true,
                    target: apiBaseUrl,
                    secure: false,
                },
                '^/api': {
                    changeOrigin: true,
                    target: apiBaseUrl,
                    secure: false,
                },
                '^/tags': {
                    changeOrigin: true,
                    target: apiBaseUrl,
                    secure: false,
                },
                '^/categories': {
                    changeOrigin: true,
                    target: apiBaseUrl,
                    secure: false,
                },
                '^/articles': {
                    changeOrigin: true,
                    target: apiBaseUrl,
                    secure: false,
                },
                '^/auth': {
                    changeOrigin: true,
                    target: apiBaseUrl,
                    secure: false,
                },
            },
        },
        build: {
            outDir: 'dist',
            assetsInlineLimit: 0,
            cssCodeSplit: false,
            rollupOptions: {
                output: {
                    assetFileNames: (assetInfo) => {
                    let extType: any = assetInfo.name?.split('.').at(1);
                    if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                        extType = 'images';
                    }
                    return `${extType}/[name]-[hash][extname]`;
                    },
                    // manualChunks: false, //если нужен один index.js
                    // inlineDynamicImports: true,
                    chunkFileNames: 'js/[name]-[hash].js',
                    entryFileNames: 'js/[name]-[hash].js',
                },
            },
            sourcemap: true,
            minify: true,
        }
    };
});
