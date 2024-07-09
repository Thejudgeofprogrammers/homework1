export interface Book {
    id: string,
    title: string;
    owner: string;
    author?: string[];
    description?: string;
    favorite?: boolean;
    fileName?: string;
    fileCover?: string;
    isPublished?: boolean;
};