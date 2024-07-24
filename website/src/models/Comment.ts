import { Schema, model } from 'mongoose';
import { ICommentDTO } from '../dtos/comment';

const commentSchema = new Schema<ICommentDTO>({
    bookId: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: true
    },
    text: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
});

const Comment = model<ICommentDTO>('Comment', commentSchema);
export default Comment;