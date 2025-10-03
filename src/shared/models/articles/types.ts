export type TArticleImage = {
    title: string;
    alt: string;
    preview: {
        webp: string;
        jpg: string;
    }
    full: {
        webp: string;
        jpg: string;
    }
};

export type TArticle = {
    id: number;
    is_visible: number;
    division: number;
    title: string;
    description: string;
    slug: string;
    published_at: number;
    updated_at: number;
    image_id: number;
    image: TArticleImage;
    year: number;
};

export type TDivisions = {
    [key: string]: string;
};
