import { Types, Document } from "mongoose";
import { ObjectId } from "mongoose";

interface IUserEmail {
    value: string;
};
  
interface IUserDTO extends Document {
    _id: string | ObjectId;
    username: string;
    password: string;
    firstName?: string;
    emails: IUserEmail[];
    books: Types.ObjectId[];
};

export default IUserDTO;
