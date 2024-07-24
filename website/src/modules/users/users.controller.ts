import { Router, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { UsersService } from "./users.service";
import { authenticate } from "../../middlewares";

@injectable()
export class UsersController {
    public router: Router;
    constructor(@inject(UsersService) private readonly usersService: UsersService) {
        this.router = Router();
        this.initializeRouter();
    };

    public initializeRouter(): void {
        this.router.get('/api/users', this.getUser.bind(this));
        this.router.get('/api/users/profile', authenticate, this.getProfileUser.bind(this));
    };

    public getUser(req: Request, res: Response): void {
        try {
            return res.render('users_ejs/home', {
                title: 'Аккаунт',
                currentPage: '/api/users'
            });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Ошибка сервера' });
        };
    };

    public getProfileUser(req: Request, res: Response): void {
        try {
            return res.render('users_ejs/profile', {
                title: "Профиль",
                currentPage: '/api/users/profile'
            });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Ошибка сервера' });
        };
    };
};
