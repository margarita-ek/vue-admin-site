export type TProductData = {
    id: number;
    article: string;
    categoryId: number;
    name: string;
    seriesIds: number[];
    series: number[];
    tags: number[];
    img: string;
    description: string;
    ageId: number;
    dimensions: {
        length: number | null;
        width: number | null;
        height: number | null;
    };
    freeFallHeight: number;
    inStock: boolean;
    isNew: boolean;
    popularity: null;
    joint: null;
    slug: string;
    is_visible: number;
    status: number;
    seo: TSeo;
    seoDefaults: {
        h1: string;
        title: string;
        meta_description: string;
        meta_keywords: string;
    };
};

export type TSeo = {
    title: string | null;
    h1: string | null;
    meta_description: string | null;
    meta_keywords: string | null;
};
