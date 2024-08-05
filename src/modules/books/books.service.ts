import { Injectable } from '@nestjs/common';
import { BookDTO } from './dto/book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Book, BookDocument } from './schemas/book.schema';

@Injectable()
export class BooksService {
    constructor(
        @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
    ) {};
    async getBook(id: string): Promise<BookDTO> {
        try {
            const book = await this.bookModel.findById(new Types.ObjectId(id)).select('-__v').exec();
            if (!book) throw new Error('Book not found');
            return book.toObject() as BookDTO;
        } catch (err) {
            console.error('Книга по id не найдена', err);
        };
    };
    async getAllBooks(userId: string): Promise<BookDTO[]> {
        try {
            const books = await this.bookModel.find({ owner: new Types.ObjectId(userId) }).select('-__v').exec();
            return books.map(book => book.toObject() as BookDTO);
        } catch (err) {
            console.error('Книга не найдена', err);
        };
    };
    async createBook(createBookDto: BookDTO): Promise<Book> {
        try {
            createBookDto.owner = new Types.ObjectId(createBookDto.owner);
            const newBook = await this.bookModel.create(createBookDto);
            return await newBook.save();
        } catch (err) {
            console.error('Книга не создана', err);
        };
    };
    async updateBook(id: string, updateData: BookDTO): Promise<Book> {
        try {
            if (updateData.owner) {
                updateData.owner = new Types.ObjectId(updateData.owner);
            };
            return await this.bookModel.findByIdAndUpdate(new Types.ObjectId(id), updateData, { new: true }).select('-__v').exec();
        } catch (err) {
            console.error('Книга не создана', err);
        };
    };
    async deleteBook(id: string): Promise<Book> {
        try {
            return await this.bookModel.findByIdAndDelete(new Types.ObjectId(id)).select('-__v').exec();
        } catch (err) {
            console.error(err);
        };
    };
};
