import { Injectable } from '@nestjs/common';
import { BookDTO } from './dto/book.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Book, BookDocument } from 'src/modules/books/schemas/book.schema';

@Injectable()
export class BooksService {
    constructor(
        @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
        @InjectConnection() private connection: Connection
    ) { }
    async getBook(id: string): Promise<BookDTO> {
        try {
            const book = await this.bookModel.findById(id).select('-__v').exec();
            if (!book) throw new Error('Book not found');
            return book.toObject() as BookDTO;
        } catch (err) {
            console.error('Книга по id не найдена', err);
        };
    };
    async getAllBooks(userId: string): Promise<BookDTO[]> {
        try {
            const books = await this.bookModel.find({ owner: userId }).select('-__v').exec();
            return books.map(book => book.toObject() as BookDTO);
        } catch (err) {
            console.error('Книга не найдена', err);
        };
    };
    async createBook(data: BookDTO): Promise<void> {
        try {
            const newBook = new this.bookModel(data);
            await newBook.save();
        } catch (err) {
            console.error('Книга не создана', err);
        };
    };
    async updateBook(id: string, updateData: BookDTO): Promise<void> {
        try {
            const updatedBook = await this.bookModel.findByIdAndUpdate(id, updateData, { new: true }).select('-__v').exec();
            if (!updatedBook) throw new Error('Book not updated');
        } catch (err) {
            console.error('Книга не создана', err);
        };
    };
    async deleteBook(id: string): Promise<void> {
        try {
            await this.bookModel.findByIdAndDelete(id).select('-__v').exec();
        } catch (err) {
            console.error(err);
        };
    };
};
