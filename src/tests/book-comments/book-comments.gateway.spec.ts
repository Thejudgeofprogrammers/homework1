import { Test, TestingModule } from '@nestjs/testing';
import { BookCommentsGateway } from '../../modules/book.comments/gateways/book-comments.gateway';
import { Server } from 'socket.io';
import { BookCommentsService } from '../../modules/book.comments/book-comments.service';
import IBookCommentDTO from '../../modules/book.comments/interface/book-comment.dto';
import { Types } from 'mongoose';

describe('BookCommentsGateway', () => {
    let gateway: BookCommentsGateway;
    let service: BookCommentsService;
    let server: Server;

    const mockBookComment: IBookCommentDTO = {
        _id: new Types.ObjectId() as any,
        bookId: new Types.ObjectId() as any,
        comment: "hello",
    };

    const mockBookCommentsService = {
        findAllComments: jest.fn(),
        createComment: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [BookCommentsGateway,
            { provide: BookCommentsService, useValue: mockBookCommentsService }
        ],
        }).compile();

        gateway = module.get<BookCommentsGateway>(BookCommentsGateway);
        service = module.get<BookCommentsService>(BookCommentsService);
        server = { emit: jest.fn() } as any as Server;
        gateway.server = server;
    });

    it('should be defined', () => {
        expect(gateway).toBeDefined();
    });

    describe('handleGetAllComments', () => {
        it('должен возвращать все комментарии для книги', async () => {
            const bookId = mockBookComment.bookId.toString();
            const comments: IBookCommentDTO[] = [mockBookComment];
            jest.spyOn(service, 'findAllComments').mockResolvedValue(comments);

            const result = await gateway.handleGetAllComments(bookId as string);

            expect(service.findAllComments).toHaveBeenCalledWith(bookId);
            expect(result).toEqual(comments);
        });
});

    describe('handleAddComment', () => {
        it('должен добавлять новый комментарий и эмитировать событие', async () => {
            const bookId = mockBookComment.bookId.toString();
            const comment = mockBookComment.comment.toString();
            const newComment: IBookCommentDTO = mockBookComment;
            jest.spyOn(service, 'createComment').mockResolvedValue(newComment);

            const result = await gateway.handleAddComment({ bookId, comment });

            expect(service.createComment).toHaveBeenCalledWith(bookId, comment);
            expect(server.emit).toHaveBeenCalledWith('commentAdded', newComment);
            expect(result).toEqual(newComment);
        });
    });
});
