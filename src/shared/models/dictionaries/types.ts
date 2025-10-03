export type TDictionariesData = {
    categories: TCategories[];
    ages: TAges[];
    divisions: TDivisions[];
    series: TSeries[];
    tags: TTags[];
    filters: TFilters;
    status: TStatus;
    success: boolean;
};

export type TCategories = {
    id: number;
    parent: number;
    lvl: number;
    parents: string;
    path: string;
    name: string;
};

export type TAges = {
    id: number;
    name: string;
    min: number;
    max: number;
    shortName: string;
};

export type TDivisions = {
    id: number;
    position: number;
    icon: string;
    name: string;
    color: string;
    textColor: string;
    background: string;
    img: string;
    categories: number[];
};

export type TSeries = {
    id: number;
    name: string;
    position: number;
    color: string;
    img: string;
};

export type TTags = {
    id: number;
    type: string;
    label: string;
    position: number | null;
    color: string | null;
    img: string | null;
};

export type TFilters = {
    isNew: {
        label: string;
        type: string;
        values: (number | null)[];
    };
    inStock: {
        label: string;
        type: string;
        values: (number | null)[];
    };
    inclusive: {
        label: string;
        type: string;
        values: (number | null)[];
    };
    series: {
        label: string;
        type: string;
        dictionary: string;
    };
    materials: {
        label: string;
        type: string;
        dictionary: string;
        tagType: string;
    };
    purpose: {
        label: string;
        type: string;
        dictionary: string;
        tagType: string;
    };
    scope: {
        label: string;
        type: string;
        dictionary: string;
        tagType: string;
    };
};

export type TStatus = {
    [key: string]: string;
};
