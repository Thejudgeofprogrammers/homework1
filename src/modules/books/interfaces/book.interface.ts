import { Document } from 'mongoose';

interface IBook extends Document {
    _id: string;
    title: string;
    description?: string;
    authors?: string;
    favorite?: boolean;
    fileName?: string;
    fileCover?: string;
    owner: string;
    isPublished?: boolean;
    count?: number;
};

export default IBook;