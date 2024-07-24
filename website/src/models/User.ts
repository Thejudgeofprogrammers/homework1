import { Schema, model } from 'mongoose';
import { IUserDTO } from '../dtos/user';

const userSchema = new Schema<IUserDTO>({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    default: ""
  },
  emails: [{
    value: {
      type: String,
      required: true
    }
  }],
  books: [{
    type: Schema.Types.ObjectId,
    ref: 'Book'
  }]
});

const User = model<IUserDTO>('User', userSchema);
export default User;
