import { Schema, model } from 'mongoose';
import { IBookDTO } from '../dtos/book';

const bookSchema = new Schema<IBookDTO>({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ""
    },
    authors: {
      type: String,
      default: ""
    },
    favorite: {
      type: Boolean,
      default: false
    },
    fileName: {
      type: String,
      default: ""
    },
    fileCover: {
      type: String,
      default: ""
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    count: {
        type: Number,
        default: 0
    }
  });


const Book = model<IBookDTO>('Book', bookSchema);
export default Book;