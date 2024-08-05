import { Model, Types } from "mongoose";
import { BooksService } from "./books.service";
import { Book } from "./schemas/book.schema";
import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";

const mockBook = {
    _id: '66afb2c1d13177c17183d4a1',
    title: 'Test Book',
    description: 'book',
    authors: 'John',
    favorite: false,
    fileCover: '',
    fileName: '',
    owner: new Types.ObjectId('66afb2c1d13177c17183d4a2'),
    isPublished: false,
    count: 0,
    save: jest.fn().mockResolvedValue(this),
    toObject: jest.fn().mockReturnThis(),
};
  
const bookArray = [mockBook];
  
const mockBookModel = {
    findById: jest.fn().mockReturnThis(),
    find: jest.fn().mockReturnThis(),
    create: jest.fn().mockResolvedValue({
        ...mockBook,
        save: jest.fn().mockResolvedValue(mockBook),
        toObject: jest.fn().mockReturnThis(),
    }),
    findByIdAndUpdate: jest.fn().mockReturnThis(),
    findByIdAndDelete: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue(mockBook),
};

describe('BooksService', () => {
    let service: BooksService;
    let model: Model<Book>;
  
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
            BooksService,
            {
                provide: getModelToken(Book.name),
                useValue: mockBookModel,
            },
            ],
        }).compile();
  
        service = module.get<BooksService>(BooksService);
        model = module.get<Model<Book>>(getModelToken(Book.name));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    
    it('should return a book', async () => {
        jest.spyOn(model, 'findById').mockReturnValueOnce({
            select: jest.fn().mockReturnThis(),
            exec: jest.fn().mockResolvedValueOnce(mockBook),
        } as any);
        const book = await service.getBook(mockBook._id.toString());
        expect(book).toEqual(mockBook);
    });
    
    it('should return an array of books', async () => {
        jest.spyOn(model, 'find').mockReturnValueOnce({
            select: jest.fn().mockReturnThis(),
            exec: jest.fn().mockResolvedValueOnce(bookArray),
        } as any);
        const books = await service.getAllBooks(mockBook.owner.toString());
        expect(books).toEqual(bookArray);
    });
    
    it('should create a new book', async () => {

        const createdBook = await service.createBook(mockBook as any);
        expect(createdBook).toEqual(mockBook);
    });
    
    it('should update a book', async () => {
        jest.spyOn(model, 'findByIdAndUpdate').mockReturnValueOnce({
            select: jest.fn().mockReturnThis(),
            exec: jest.fn().mockResolvedValueOnce(mockBook),
        } as any);
        const updatedBook = await service.updateBook(mockBook._id.toString(), mockBook as any);
        expect(updatedBook).toEqual(mockBook);
    });
    
    it('should delete a book', async () => {
        jest.spyOn(model, 'findByIdAndDelete').mockReturnValueOnce({
            select: jest.fn().mockReturnThis(),
            exec: jest.fn().mockResolvedValueOnce(mockBook),
        } as any);
        const deletedBook = await service.deleteBook(mockBook._id.toString());
        expect(deletedBook).toEqual(mockBook);
    });
});