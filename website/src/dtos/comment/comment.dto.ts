import { Types, Document } from "mongoose";

interface ICommentDTO extends Document {
    bookId: Types.ObjectId;
    text: string;
    username: string;
    date?: Date;
};

export default ICommentDTO;
