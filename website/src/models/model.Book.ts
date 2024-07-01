interface Book {
    title: string;
    owner: string;
    author?: string[];
    description?: string;
    favorite?: boolean;
    fileName?: string;
    fileCover?: string;
    isPublished?: boolean;
};

abstract class BooksRepository {
    
    abstract getBook(id: string): void;

    abstract getBooks(): void;

    abstract createBook(book: Book): void;

    abstract updateBook(id: string, book: Partial<Book>): void;
    
    abstract deleteBook(id: string): void;
};