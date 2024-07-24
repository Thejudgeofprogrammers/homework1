import { IUserDTO } from "../../dtos/user"

declare global {
    namespace Express {
        interface User extends IUserDTO {};
        interface Request {
            user?: IUserDTO 
        };
    };
};
