export type TCategoryData = {
    id: number;
    parent_id: number;
    image_id: number | null;
    icon: string;
    is_visible: number;
    name: string;
    slug: string;
    description: string;
    content: string;
    updated_at: number;
    pos: number;
    seo: TSeo;
    seoDefaults: {
        h1: string;
        title: string;
        description: string;
        keywords: string;
    };
};

export type TSeo = {
    title: string | null;
    h1: string | null;
    description: string | null;
    keywords: string | null;
};

export type TFilesDrag = {
    target: { files: FileList };
};
