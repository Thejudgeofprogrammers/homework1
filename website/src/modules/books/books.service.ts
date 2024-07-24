import axios from "axios";
import path from "path";
import { injectable } from "inversify";
import { Request, Response } from "express";
import { Comment, Book, User } from "../../models";
import { IBookDTO } from "../../dtos/book";
import { IUserDTO } from "../../dtos/user";

@injectable()
export class BooksService {
    public async getAllBooks(req: Request, res: Response): Promise<IBookDTO[]> {
        try {
            const books: IBookDTO[] = await Book.find({ owner: req.user._id }).select('-__v');
            const booksWithCount = await Promise.all(books.map(async (book: IBookDTO) => {
                const response = await axios.get(`http://counter:4000/morecounter/${book._id}`);
                book.count = response.data.count;
                return book;
            }));
            return booksWithCount;
        } catch (err) {
            console.error('Книги не найдены', err);
            res.status(500).send({ message: 'Ошибка сервера' });
        };
    };

    public async getBook(req: Request, res: Response): Promise<IBookDTO> {
        try {
            const book: IBookDTO = await Book.findById(req.params.id).select('-__v');
            await axios.post(`http://counter:4000/counter/${book._id}`);
            if (!book) res.status(404).send({ message: 'Книга не найдена' });
            if (book.owner.toString() !== req.user._id.toString() && !book.isPublished) {
                res.status(403).send({ message: 'Доступ к книге запрещён' });
            };
            return book;
        } catch (err) {
            console.error('Книга по id не найдена', err);
            res.status(500).send({ message: 'Ошибка сервера' });
        };
    };

    public async createBookPost(req: Request, res: Response): Promise<void> {
        try {
            const { title, description, authors, favorite } = req.body;
            const findBook = await Book.findOne({ title }).select('-__v');
            if (findBook) return res.redirect('/api/books');
            const userId = req.session.userId;
            if (!userId) return res.redirect('/auth/login');
            const bookData = {
                title,
                description,
                authors,
                favorite: favorite === 'on',
                fileName: req.file ? req.file.originalname : '',
                fileCover: req.file ? req.file.filename : '',
                owner: userId
            };

            const book: IBookDTO = new Book(bookData);
            await book.save();

            const user: IUserDTO | null = await User.findById(userId);
            if (user) {
                user.books.push(book._id as any); // Пофиксить
                await user.save();
            };
            return res.redirect(`/api/books`);
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Ошибка сервера' });
        };
    };

    public async updateBook(req: Request, res: Response): Promise<IBookDTO> {
        try {
            const book: IBookDTO = await Book.findById(req.params.id).select('-__v');
            if (!book) res.status(404).send({ message: 'Книга не была обновлена' });
            return book;
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Ошибка сервера' });
        };
    };

    public async updateBookPost(req: Request, res: Response): Promise<Response | void> {
        try {
            const { title } = req.body
            if (!title) return res.redirect('/api/books');
            const findBook = await Book.findOne({ title }).select('-__v');
            if (findBook) return res.redirect('/api/books');
            const updateData = {
                title: req.body.title,
                description: req.body.description,
                authors: req.body.authors,
                favorite: req.body.favorite === 'on',
                fileName: req.file?.originalname,
                fileCover: req.file?.filename
            };

            const updatedBook: IBookDTO = await Book.findByIdAndUpdate(req.params.id, updateData, { new: true }).select('-__v');
            if (!updatedBook) return res.status(404).send({ message: 'Книга не была обновлена' });
            res.redirect('/api/books');
        } catch (err) {
            console.error("Ошибка обновления", err);
            res.status(500).send({ message: 'Ошибка сервера' });
        };
    };

    public async getDownloadFile(req: Request, res: Response): Promise<void> {
        try {
            const book: IBookDTO = await Book.findById(req.params.id);
            const { fileCover, fileName } = book;
            res.download(path.join(__dirname, '..', '..', '..', 'public', 'uploads', fileCover), fileName, (err) => {
                if (err) {
                    console.error('Ошибка скачивания', err);
                    return res.status(500).send({ message: 'Ошибка скачивания' });
                };
            });
        } catch (err) {
            console.error('Ошибка скачивания', err);
            res.status(500).send({ message: 'Ошибка сервера' });
        };
    };

    public async deleteBookPost(req: Request, res: Response): Promise<void> {
        try {
            await Book.findByIdAndDelete(req.params.id).select('-__v');
            await Comment.deleteMany({ bookId: req.params.id });
            await axios.post(`http://counter:4000/counter/delete/${req.params.id}`);
        } catch (err) {
            console.error('Ошибка удаления книги', err);
            res.status(500).send({ message: 'Ошибка сервера' });
        };
    };

    public async publishBooks(req: Request, res: Response): Promise<IBookDTO[]> {
        try {
            const books: IBookDTO[] = await Book.find({ isPublished: true }).select('-__v');
            const booksWithCount = await Promise.all(books.map(async (book: IBookDTO) => {
                const response = await axios.get(`http://counter:4000/morecounter/${book._id}`);
                book.count = response.data.count;
                return book;
            }));
            return booksWithCount;
        } catch (err) {
            console.error('Опубликованные книги не найдены', err);
            res.status(500).send({ message: 'Ошибка сервера' });
        };
    };

    public async publishBook(req: Request, res: Response): Promise<IBookDTO> {
        try {
            const book: IBookDTO = await Book.findById(req.params.id).select('-__v');
            await axios.post(`http://counter:4000/counter/${book._id}`);

            if (!book) res.status(404).send({ message: 'Книга не найдена' });
            if (!book.isPublished) res.status(403).send({ message: 'Доступ запрещён' });
            
            return book;
        } catch (err) {
            console.error('Опубликованная книга не найдена', err);
            res.status(500).send({ message: 'Ошибка сервера' });
        };
    };

    public async publishBookPost(req: Request, res: Response): Promise<Response | void> {
        try {
            const book: IBookDTO = await Book.findById(req.params.id);
            
            if (!book) return res.status(404).send({ message: 'Книга не найдена' });

            if (book.owner.toString() !== req.user._id.toString()) {
                return res.status(403).send({ message: 'Доступ запрещён' });
            };

            book.isPublished = true;
            await book.save();
            res.redirect(`/api/books`);
        } catch (err) {
            console.error('Error книга не опубликована', err);
            res.status(500).send({ message: 'Ошибка сервера' });
        };
    };

    public async unPublishBookPost(req: Request, res: Response): Promise<Response | void> {
        try {
            const book: IBookDTO = await Book.findById(req.params.id);
            
            if (!book) return res.status(404).send({ message: 'Книга не найдена' });

            if (book.owner.toString() !== req.user._id.toString()) {
                return res.status(403).send({ message: 'Доступ запрещён' });
            };

            book.isPublished = false;
            await book.save();
            res.redirect(`/api/books`);
        } catch (err) {
            console.error('Error книга не опубликована', err);
            res.status(500).send({ message: 'Ошибка сервера' });
        };
    };
};
