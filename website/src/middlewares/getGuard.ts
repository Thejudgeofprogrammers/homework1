import { Request, Response, NextFunction } from "express";

const getUserData = ((req: Request, res: Response, next: NextFunction): void => {
    res.locals.user = req.user;
    if (req.user) {
        req.session.userId = req.user.id;
    };
    next();
});

export { getUserData };