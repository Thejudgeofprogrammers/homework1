import { Router, Request, Response  } from "express";
import { inject, injectable } from "inversify";
import { BooksService } from "./books.service";
import { authenticate, multerStore } from "../../middlewares";

@injectable()
export class BooksController {
    public router: Router;
    
    constructor(@inject(BooksService) private readonly booksService: BooksService) {
        this.router = Router();
        this.initializeRouter();
    };

    public initializeRouter(): void {
        this.router.get('/api/books', authenticate, this.getAllBooks.bind(this));
        this.router.get('/api/books/get/:id', authenticate, this.getBook.bind(this));
        this.router.get('/api/books/create', authenticate, this.createBook.bind(this));
        this.router.post('/api/books/create', authenticate, multerStore.single('cover'), this.createBookPost.bind(this));
        this.router.get('/api/books/update/:id', authenticate, this.updateBook.bind(this));
        this.router.post('/api/books/update/:id', authenticate, multerStore.single('cover'), this.updateBookPost.bind(this));
        this.router.get('/api/books/download/:id', authenticate, this.getDownloadFile.bind(this));
        this.router.post('/api/books/delete/:id', authenticate, this.deleteBookPost.bind(this));
        this.router.get('/api/books/publish', this.publishBooks.bind(this));
        this.router.get('/api/books/publish/:id', this.publishBook.bind(this));
        this.router.post('/api/books/publish/:id', authenticate, this.publishBookPost.bind(this));
        this.router.post('/api/books/unpublish/:id', authenticate, this.unPublishBookPost.bind(this));
    };

    public async getAllBooks(req: Request, res: Response): Promise<void> {
        try {
            const data = await this.booksService.getAllBooks(req, res);
            return res.render('books/index', { 
                title: 'Book', 
                currentPage: '/api/books', 
                books: data
            });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Ошибка сервера' });
        };
    };

    public async getBook(req: Request, res: Response): Promise<void> {
        try {
            const data = await this.booksService.getBook(req, res);
            return res.render('books/view', { 
                title: 'Book | view', 
                currentPage: '/api/books/get/:id', 
                firstName: req.user.firstName,
                book: data
            });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Ошибка сервера' });
        };
    };
    
    public createBook(req: Request, res: Response): void {
        try {
            return res.render('books/create', {
                title: 'Book | create',
                book: {
                    title: '',
                    description: '',
                    authors: '',
                    favorite: false,
                    fileName: '',
                    fileCover: ''
                },
                currentPage: '/api/books/create'
            });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Ошибка сервера' });
        };
    };

    public async createBookPost(req: Request, res: Response): Promise<Response | void> {
        try {
            return await this.booksService.createBookPost(req, res);
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Ошибка сервера' });
        };
    };

    public updateBook(req: Request, res: Response): void {
        try {
            const data = this.booksService.updateBook(req, res);
            return res.render('books/update', { 
                title: 'book | update', 
                currentPage: '/api/books/update/:id', 
                book: data
            });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Ошибка сервера' });
        };
    };

    public async updateBookPost(req: Request, res: Response): Promise<Response | void> {
        try {
            return await this.booksService.updateBookPost(req, res);
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Ошибка сервера' });
        };
    };

    public async getDownloadFile(req: Request, res: Response): Promise<void> {
        try {
            return await this.booksService.getDownloadFile(req, res);
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Ошибка сервера' });
        };
    };

    public async deleteBookPost(req: Request, res: Response): Promise<void> {
        try {
            await this.booksService.deleteBookPost(req, res);
            res.redirect('/api/books');
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Ошибка сервера' });
        };
    };

    public async publishBooks(req: Request, res: Response): Promise<void> {
        try {
            const data = await this.booksService.publishBooks(req, res);
            return res.render('books/index', {
                title: 'Published Books',
                currentPage: '/api/books/publish',
                books: data
            });
        } catch (err) {
            console.error(err);
            if (!res.headersSent) {
                res.status(500).send({ message: 'Server error' });
            };
        };
    };

    public async publishBook(req: Request, res: Response): Promise<void> {
        try {

            const data = await this.booksService.publishBook(req, res);
            return res.render('books/view', { 
                title: "Published Book | View", 
                currentPage: '/api/books/publish/:id', 
                firstName: req.user.firstName,
                book: data
            });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Ошибка сервера' });
        };
    };

    public async publishBookPost(req: Request, res: Response): Promise<Response | void> {
        try {
            return await this.booksService.publishBookPost(req, res);
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Ошибка сервера' });
        };
    };

    public async unPublishBookPost(req: Request, res: Response): Promise<Response | void> {
        try {
            return await this.booksService.unPublishBookPost(req, res);
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Ошибка сервера' });
        };
    };
};
