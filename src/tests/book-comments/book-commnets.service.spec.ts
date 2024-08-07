import { Model, Types } from "mongoose";;
import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { BookComment } from "../../modules/book.comments/schemas/book-comment.schema";
import { BookCommentsService } from "../../modules/book.comments/book-comments.service";

const mockBookComment = {
    _id: new Types.ObjectId('66afb2c1d13177c17183d4a1'),
    bookId: new Types.ObjectId('66afb2c1d13177c17183d4a2'),
    comment: "hello",
    save: jest.fn().mockResolvedValue(this),
    toObject: jest.fn().mockResolvedValue(this),
};
  
const bookCommentsArray = [mockBookComment];
  
const mockBookCommentModel = {
    find: jest.fn().mockReturnThis(),
    create: jest.fn().mockResolvedValue({
        ...mockBookComment,
        save: jest.fn().mockResolvedValue(mockBookComment),
        toObject: jest.fn().mockReturnThis(),
    }),
    findByIdAndUpdate: jest.fn().mockResolvedValue(mockBookComment),
    findByIdAndDelete: jest.fn().mockResolvedValue(mockBookComment),
    select: jest.fn().mockReturnThis(),
    save: jest.fn().mockResolvedValue(this),
    toObject: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue(bookCommentsArray)
};

describe('BookCommentsService', () => {
    let service: BookCommentsService;
    let model: Model<BookComment>;
  
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BookCommentsService,
                {
                    provide: getModelToken(BookComment.name),
                    useValue: mockBookCommentModel,
                },
            ],
        }).compile();
  
        service = module.get<BookCommentsService>(BookCommentsService);
        model = module.get<Model<BookComment>>(getModelToken(BookComment.name));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    
    it('should return an array of book comments', async () => {
        const comments = await service.findAllComments(mockBookComment.bookId.toString());
        expect(comments).toEqual(bookCommentsArray);
    });
    
    it('should create a new book comment', async () => {
        const createdBookComment = await service.createComment(mockBookComment.bookId.toString(), mockBookComment.comment);
        expect(createdBookComment).toEqual(mockBookComment);
    });
    
    it('should update a book comment', async () => {
        jest.spyOn(model, 'findByIdAndUpdate').mockReturnValueOnce({
            select: jest.fn().mockReturnThis(),
            exec: jest.fn().mockResolvedValueOnce(mockBookComment),
        } as any);
        const updatedBook = await service.updateComment(mockBookComment._id.toString(), mockBookComment as any);
        expect(updatedBook).toEqual(mockBookComment);
    });
    
    it('should delete a book comment', async () => {
        jest.spyOn(model, 'findByIdAndDelete').mockReturnValueOnce({
            select: jest.fn().mockReturnThis(),
            exec: jest.fn().mockResolvedValueOnce(mockBookComment),
        } as any);
        const deletedBookComment = await service.deleteComment(mockBookComment._id.toString());
        expect(deletedBookComment).toEqual(mockBookComment);
    });
});