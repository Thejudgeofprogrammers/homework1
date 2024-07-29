import { Injectable } from '@nestjs/common';
import { BookDTO } from './dto/book.dto';
import { mooksBook } from 'src/mooks';
import { ObjectId } from 'mongodb';

@Injectable()
export class BooksService {
    async findOne(id: string): Promise<BookDTO>  {
        try {
            return mooksBook.find((el) => id === el._id);
        } catch (err) {
            console.error(err);
        };
    };
    async findAll(): Promise<BookDTO[]>  {
        try {
            return mooksBook;
        } catch (err) {
            console.error(err);
        };
    };
    async createBook(data: BookDTO): Promise<void> {
        const { title, description, authors, favorite, fileCover, fileName } = data;
        const newBook = {
            _id: new ObjectId().toString(),
            title, 
            description, 
            authors, 
            favorite, 
            fileCover, 
            fileName,
            owner: 'Owner1',
            isPublished: false,
            count: 0
        };
        try {
            mooksBook.push(newBook);
        } catch (err) {
            console.error(err);
        };
    };
    async updateBook(id: string, update_data: BookDTO): Promise<void> {
        try {
            const data = mooksBook.find((el) => id === el._id);
            if (data) {
                const { title, description, authors, favorite, fileCover, fileName } = update_data;

                data.title = title;
                data.description = description;
                data.authors = authors;
                data.favorite = favorite;
                data.fileCover = fileCover;
                data.fileName = fileName;
            }
        } catch (err) {
            console.error(err);
        };
    };
    async deleteBook(id: string): Promise<void> {
        try {
            const bookIndex = mooksBook.findIndex((el) => id === el._id);
            if (bookIndex > -1) {
                mooksBook.splice(bookIndex, 1);
            };
        } catch (err) {
            console.error(err);
        };
    };
}
