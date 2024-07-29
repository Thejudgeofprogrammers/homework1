import { Document, Schema } from 'mongoose';

interface IBook extends Document {
    _id: Schema.Types.ObjectId;
    title: string;
    description?: string;
    authors?: string;
    favorite?: boolean;
    fileName?: string;
    fileCover?: string;
    owner: Schema.Types.ObjectId;
    isPublished?: boolean;
    count?: number;
};

export default IBook;