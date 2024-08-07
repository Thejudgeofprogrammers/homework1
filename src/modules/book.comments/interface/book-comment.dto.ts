import { Types } from "mongoose"

interface IBookCommentDTO {
    _id: Types.ObjectId;
    bookId: Types.ObjectId;
    comment: string;
}

export default IBookCommentDTO;
