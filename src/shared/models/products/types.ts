export type TProduct = {
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
        length: number;
        width: number;
        height: number;
        area: number | null;
    };
    freeFallHeight: number;
    inStock: boolean;
    isNew: boolean;
    popularity: number | null;
    joint: string | null;
    is_visible: number;
    status: number;
};
