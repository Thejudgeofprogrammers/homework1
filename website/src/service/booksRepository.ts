export abstract class BooksRepository {
    abstract createBook(book: any): Promise<any>;
    abstract getBook(id: string): Promise<any>;
    abstract getBooks(): Promise<any>;
    abstract updateBook(id: string, book: any): Promise<any>;
    abstract deleteBook(id: string): Promise<any>;
};