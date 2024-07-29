import { BookDTO } from "src/modules/books/dto/book.dto"

declare global {
    namespace Express {
        interface User extends BookDTO {};
        interface Request {
            user?: BookDTO 
        };
    };
};