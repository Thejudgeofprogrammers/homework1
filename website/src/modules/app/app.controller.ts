import { inject, injectable } from "inversify";
import { AppService } from "./app.service";
import { Request, Response, Router } from "express";

@injectable()
export class AppController {
    public router: Router;

    constructor(@inject(AppService) private readonly appService: AppService) {
        this.router = Router();
        this.initializeRouter();
    };

    public initializeRouter(): void {
        this.router.get('/', this.getMainPage.bind(this));
    };

    public getMainPage(req: Request, res: Response): void {
        try {
            return res.render('index', {
                title: 'Главная',
                currentPage: '/',
            });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Ошибка сервера' });
        };
    };
};
