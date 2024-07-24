import { Document, Types } from 'mongoose';

interface IBookDTO extends Document {
    title: string;
    description?: string;
    authors?: string;
    favorite?: boolean;
    fileName?: string;
    fileCover?: string;
    owner: Types.ObjectId;
    isPublished?: boolean;
    count?: number;
};

export default IBookDTO;