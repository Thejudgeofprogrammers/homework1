import express, { NextFunction, Request, Response } from 'express';
import { container } from './container';
import { BooksRepository } from './booksRepository';

const router = express.Router();

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const repo = container.get<BooksRepository>(BooksRepository);
        const book = await repo.getBook(req.params.id);
        if (!book) {
            return res.status(404).send('Книга не найдена');
        };
        res.json(book);
    } catch (err) {
        next(err);
    };
})

export { router };