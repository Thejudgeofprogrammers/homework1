import { injectable } from 'inversify';
import { BooksRepository } from './booksRepository';
import { Book } from './Book';

@injectable()
export class BooksRepositoryImplements implements BooksRepository {
    private books: Book[] = [];

    async createBook(book: any): Promise<Book> {
        this.books.push(book);
        return book;
    };

    async getBook(id: string): Promise<Book | null> {
        const findBook = this.books.find(bookSearch => bookSearch.id === id);
        return findBook || null;
    };

    async getBooks(): Promise<Book[]> {
        return this.books;
    };

    async updateBook(id: string, book: any): Promise<Book | null> {
        const findBookIndex = this.books.findIndex(bookSearch => bookSearch.id === id);
        if (findBookIndex === -1) {
            return null;
        };

        this.books[findBookIndex] = book;
        return book;
    };

    async deleteBook(id: string): Promise<boolean> {
        const findBookIndex = this.books.findIndex(bookSearch => bookSearch.id === id);
        if (findBookIndex === -1) {
            return false;
        };

        this.books.splice(findBookIndex, 1);
        return true;
    };

};