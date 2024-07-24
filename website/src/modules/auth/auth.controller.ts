import { NextFunction, Router, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { AuthService } from "./auth.service";

@injectable()
export class AuthController {
    public router: Router;
    constructor(@inject(AuthService) private readonly authService: AuthService) {
        this.router = Router();
        this.initializeRouter();
    };

    public initializeRouter(): void {
        this.router.get('/auth/login', this.loginUser.bind(this));
        this.router.get('/auth/registry', this.registryUser.bind(this));
        this.router.get('/auth/logout', this.logoutUser.bind(this));
        this.router.post('/auth/registry', this.registryUserPost.bind(this));
        this.router.post('/auth/login', this.loginUserPost.bind(this));
    };

    public loginUser(req: Request, res: Response): void {
        try {
            return res.render('users_ejs/login', { 
                title: "login", 
                currentPage: '/auth/login' 
            });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Ошибка сервера' });
        };
    };

    public registryUser(req: Request, res: Response): void {
        try {
            return res.render('users_ejs/registry', { 
                title: "Registry", 
                currentPage: '/auth/registry' 
            });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Ошибка сервера' });
        };
    };

    public logoutUser(req: Request, res: Response, next: NextFunction): void {
        try {
            return req.logout((err: any) => {
                if (err) {
                    return next(err);
                };
                return res.redirect('/api/users');
            });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Ошибка сервера' });
        };
    };

    public async registryUserPost(req: Request, res: Response): Promise<Response | void> {
        try {
            return await this.authService.registryUserPost(req, res);
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Ошибка сервера' });
        };
    };

    public loginUserPost(req: Request, res: Response, next: NextFunction): void {
        try {
            return this.authService.loginUserPost(req, res, next);
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Ошибка сервера' });
        };
    };
};