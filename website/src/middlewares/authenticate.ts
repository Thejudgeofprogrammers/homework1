import { Request, Response, NextFunction } from "express";

const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
        next();
    } else {
        console.log('User not authenticated');
        return res.redirect('/auth/login');
    };
};

export { authenticate };