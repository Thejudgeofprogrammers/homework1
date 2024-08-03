import { NextFunction, Request, Response } from "express";

export function loggerMiddleware(req: Request, res: Response, next: NextFunction): void {
    const routeUrl = req.baseUrl
    console.log(routeUrl);
    return next();
};
