export type Category = {
    id: number;
    parent: number;
    level: string;
    name: string;
    slug: string;
    path: string;
    imageId: string | null;
    icon: string | null;
    children?: Category[];
};
