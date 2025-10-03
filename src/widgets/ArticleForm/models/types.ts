export type TArticleData = {
    id: number;
    is_visible: number;
    title: string;
    slug: string;
    division: number;
    image_id: number;
    gallery_id: null;
    description: string | null;
    content: string;
    created_at: number;
    updated_at: number;
    published_at: number;
    seo: {
        h1: string | null;
        title: string | null;
        meta_description: string | null;
        meta_keywords: string | null;
    };
    seoDefaults: {
        h1: string | null;
        title: string | null;
        meta_description: string | null;
        meta_keywords: string | null;
    };
    img: string;
};
