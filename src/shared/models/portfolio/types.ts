export type TImage = {
    [key: string]: {
        [key: string]: string;
    }
}

export type TImageDescription = {
    id: number | null;
    alt: string | null;
    title: string | null;
}

export type TProject = {
    id: number | string;
    is_visible: number;
    year: number | string;
    division: number | string;
    title: string;
    slug: string;
    address: string;
    image_id: number | string;
    gallery_id: number | string;
    description: string;
    created_at?: any,
    updated_at: number | string;
    image: any;
}

export type TGalleryItem = {
    description: string | null;
    file_id: number | string | null;
    gallery_id: number | string | null;
    image: TImage | null;
    is_visible: number | string | null;
    pos: number | string;
    title: string | null;
}

export interface TSeo {
    h1: string | null;
    meta_description: string | null;
    meta_keywords: string | null;
    title: string | null;
}

export interface TSeoResult extends TSeo {
    commercial: string | null;
}

export type TDivisions = {
    [key: string]: string;
}

export type TGalleryDataObject = {
    file_id: string | number,
    pos: number,
    alt: string,
    title: string,
    full: string,
    preview: string,
    file?: any,
}

export type TGalleryData = {
    [key: string]: TGalleryDataObject;
}