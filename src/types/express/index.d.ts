import { UserID } from "src/modules/app/interfaces/user.interface.id"

declare global {
    namespace Express {
        interface User extends BookDTO {};
        interface Request {
            user?: UserID
        };
    };
};